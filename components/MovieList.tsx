import React from "react"
import { isEmpty } from "lodash"
import MovieCard from "./MovieCard"

interface MovieListProps {
    data: Record<string, any>[],
    title: string
}

const MovieList: React.FC<MovieListProps> = ({ data , title }) => {

    if (isEmpty(data)) return null

    return (
        <div id='movie-list' className="px-4 md:px-12 mt-4 space-y-8">
            <div className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                {title}
            </div>
            <div className="grid grid-cols-4 gap-2">
                {/* For each element (movie) in data, return this div */}
                {data.map((movie) => (  
                    <MovieCard key={movie.id} data={movie}/>
                ))}
            </div>
        </div>
    )
}

export default MovieList

