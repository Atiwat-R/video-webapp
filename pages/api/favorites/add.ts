import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb"

// Backend API Endpoint for adding a movie to favorites list
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Check if request is POST
        if (req.method !== 'POST') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }

        // Find movie to be added
        const { movieId, currentUser } = req.body

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!existingMovie) throw new Error("ID doesn't exist")

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })
        return res.status(200).json(user);
        

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}
