import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import prismadb from "@/lib/prismadb"
import redis from '@/lib/redis';

// If [ movieId = 5678 ] this file will have path [ /api/movies/5678 ]

const REDIS_CACHE_EXPIRATION = 600 // 600 sec / 10 minutes

// Backend API Endpoint for
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }

        // Just to check if user is logged in
        await serverAuth(req) 

        const { movieId } = req.query // const movieId = req.query.movieId // movieId variable exists because the file is [movieId].ts
        if (!movieId || typeof movieId !== "string") throw new Error("Invalid Movie ID")

        // Return Redis Cache'd data, if exists
        let cache = await redis.get("movieId_" + movieId); // Redis Key Ex. movieId_5678 
        if (cache) {
            return res.status(200).json(JSON.parse(cache));
        }

        // No Redis cache, pull data from DB
        const movieData = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!movieData) throw new Error("Invalid Movie ID")

        // Upload data onto Redis
        await redis.set("movieId_" + movieId, JSON.stringify(movieData), 'EX', REDIS_CACHE_EXPIRATION);

        return res.status(200).json(movieData);
    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}









