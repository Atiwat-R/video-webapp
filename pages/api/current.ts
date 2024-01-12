import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';

// Backend API Endpoint for fetching current user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }

        const { currentUser } = await serverAuth(req)
        return res.status(200).json(currentUser);

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}









