import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"
import serverAuth from '@/lib/serverAuth';


// Backend API Endpoint for fetching one random Movie from database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
        // Just to check if user is logged in
        await serverAuth(req) 

        const movieCount = await prismadb.movie.count()
        const randomIndex = Math.floor(Math.random() * movieCount)

        // Returns an array of movies
        const manyRandomMovies = await prismadb.movie.findMany({
            take: 1, // Take only 1 element
            skip: randomIndex // Skip certain amount of indexes before taking the 
        })

        const oneRandomMovie = manyRandomMovies[0]

        return res.status(200).json(oneRandomMovie);

    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}



