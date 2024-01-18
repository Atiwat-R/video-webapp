import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"
import serverAuth from '@/lib/serverAuth';


// Backend API Endpoint to obtain User Info (Made BECAUSE serverAuth(req) doesn't work with POST req for some reason)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is GET
        if (req.method !== 'GET') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
        // Just to check if user is logged in
        const currentUser = (await serverAuth(req)).currentUser

        const userInfo = {
            "name": currentUser.name,
            "email": currentUser.email,
            "favoriteIds": currentUser.favoriteIds
        }

        return res.status(200).json(userInfo);

    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}



