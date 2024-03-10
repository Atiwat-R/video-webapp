import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"
import serverAuth from '@/lib/serverAuth';
import redis from '@/lib/redis';

const REDIS_CACHE_EXPIRATION = 600 // 600 sec / 10 minutes

// Backend API Endpoint for fetching Favorite movies ( whose ID is in user's favoriteIds list )
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
        const { currentUser } = await serverAuth(req)

        // Return Redis Cache'd data, if exists
        let cache = await redis.get(`favorites_${currentUser.id}`);
        if (cache) {
            return res.status(200).json(JSON.parse(cache));
        }
    
        // No Redis cache, pull data from DB
        // From DB of movies, fetch only movies whose ID is in user's favoriteIds list
        const favoritesList = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        })

        // Cache data on Redis
        await redis.set("favorites_" + currentUser.id, JSON.stringify(favoritesList), 'EX', REDIS_CACHE_EXPIRATION);
        
        return res.status(200).json(favoritesList);

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}
