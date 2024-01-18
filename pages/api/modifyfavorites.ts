import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash'
import prismadb from "@/lib/prismadb"

// Backend API Endpoint for handing POST and DELETE favorite movie
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        // If request is POST, add movie to User's favoriteIds list
        if (req.method == 'POST') {

            // Find movie to be added
            const { movieId, currentUser } = req.body

            console.log(movieId)

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
        }
        if (req.method == 'DELETE') {

            // Find movie to be deleted
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
        }

        // If reached this line, the req is neither POST nor DELETE
        return res.status(405).end(); // Error 405 Method Not Allowed

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}
