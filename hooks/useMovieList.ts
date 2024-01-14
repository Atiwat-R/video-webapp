import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/movies', fetcher, { // GET /api/movies/index.ts
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }) 

    return { 
        data, 
        error, 
        isLoading
    }
}

export default useMovieList