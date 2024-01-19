import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id: string) => {

    const apiPath = id ? `/api/movies/${id}` : null

    const { data, error, isLoading } = useSWR(apiPath, fetcher, {
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

export default useMovie
