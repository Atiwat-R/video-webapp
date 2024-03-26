import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"
import redis from '@/lib/redis';

// Backend API Endpoint for Uploading Metadata to Relational Database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is POST
        if (req.method !== 'POST') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
  
        // Create Movie
        await prismadb.movie.create({
            data: req.body.data
        })

        // Delete old cache from Redis, to pave way for the new
        await redis.del("movies");

        return res.status(200).json({'Success':1});

    } catch (error) {
        return res.status(400).json({ error: `Error at /api/upload.ts: ${error}` });
    }
}



