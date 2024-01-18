import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash'
import prismadb from "@/lib/prismadb"
import serverAuth from '@/lib/serverAuth';

// Backend API Endpoint removing favorite movie
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Check if request is POST
        if (req.method !== 'POST') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }

        const { movieId, currentUser } = req.body

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!existingMovie) throw new Error("ID doesn't exist")

        // Create new favorite list
        const newFavoriteIds = without(currentUser.favoriteIds, movieId)

        // Replace User's old favoriteIds list with new one
        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: newFavoriteIds
            }
        })
        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}
