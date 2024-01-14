import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import prismadb from "@/lib/prismadb"



// Backend API Endpoint for fetching ALL Movie in the table
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }

        // Just to check if user is logged in
        await serverAuth(req) 

        // Obtain all movies
        const movies = await prismadb.movie.findMany()

        return res.status(200).json(movies);

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}









