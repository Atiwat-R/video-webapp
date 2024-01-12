import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"

// Backend API Endpoint for Uploading Movies
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is POST
        if (req.method !== 'POST') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
  
        console.log("UPLOAD API")
        console.log(req.body.data)
  
        // Create Movie
        const newMovie = await prismadb.movie.create({
            data: req.body.data
        })

        return res.status(200).json({'Success':1});

    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}



