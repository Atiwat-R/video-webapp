import React, { useCallback, useMemo } from "react"
import axios from "axios"

import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"

import { AiOutlinePlus , AiOutlineCheck } from "react-icons/ai"

interface FavoriteButtonProps {
    movieId: string
}


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    // Obtain data from hooks
    const { mutate: mutateFavorites } = useFavorites() // useFavorites().mutate -> mutateFavorites
    const { mutate: mutateCurrentUser, data: currentUser } = useCurrentUser() // useCurrentUser().mutate -> mutateCurrentUser && useCurrentUser().data -> currentUser 

    // Find if movieId is already in favorite list. Memoized, only re-compute once variables in dependency array changes
    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(movieId)
    }, [currentUser, movieId])

    // When user pres FavoriteButton, either add or remove movieId from favorite list
    const toggleFavorites = useCallback(async () => {
        let response

        const modifyFavoritesData = { 
            movieId: movieId, 
            currentUser: currentUser 
        }

        if (!isFavorite) {
            // Add movieId to favorite list
            response = await axios.post('/api/favorites/add', modifyFavoritesData)
        } else {
            // Remove movieId from favorite list
            response = await axios.post('/api/favorites/remove', modifyFavoritesData)
        }

        const newFavoriteIds = response?.data?.favoriteIds

        // Update currentUser in webpage
        mutateCurrentUser({
            ...currentUser,
            favoriteIds: newFavoriteIds
        })
    }, [movieId, isFavorite, currentUser, mutateCurrentUser]) // mutateFavorites

    mutateFavorites()

    // Icon for FavoriteButton. Will be computed to either <AiOutlineCheck/> or <AiOutlinePlus/>
    const FavoriteButtonIcon = isFavorite ? AiOutlineCheck : AiOutlinePlus

    return (
        <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <FavoriteButtonIcon className="text-white" size={25} />
        </div>
    )
}

export default FavoriteButton


