import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"
import serverAuth from '@/lib/serverAuth';

// Backend API Endpoint for fetching movies whose ID is in user's favoriteIds list
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
        const currentUser = (await serverAuth(req)).currentUser

        // From DB of movies, fetch only movies whose ID is in user's favoriteIds list
        const favoritesList = prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        })
        return res.status(200).json(favoritesList);

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}
