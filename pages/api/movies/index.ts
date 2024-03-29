import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import prismadb from "@/lib/prismadb"
import redis from '@/lib/redis';

const REDIS_CACHE_EXPIRATION = 600 // 600 sec / 10 minutes

// Backend API Endpoint for fetching ALL Movie in the table
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }

        // Just to check if user is logged in
        await serverAuth(req) 

        // Return Redis Cache'd data, if exists
        let cache = await redis.get("movies");
        if (cache) {
            return res.status(200).json(JSON.parse(cache));
        }

        // No Redis cache, proceed to pull data from MongoDB
        // Obtain all movies
        const movies = await prismadb.movie.findMany()

        // Upload data onto Redis
        await redis.set("movies", JSON.stringify(movies), 'EX', REDIS_CACHE_EXPIRATION);

        return res.status(200).json(movies);

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}









