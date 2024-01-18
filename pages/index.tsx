import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import Navbar from "@/components/Navbar"
import useFavorites from "@/hooks/useFavorites"
import useMovieList from "@/hooks/useMovieList"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  // If cannot get session (not logged in) redirect to auth screen
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}


export default function Home() {

  const { data: movieList = [] } = useMovieList()
  const { data: favoritesList = [] } = useFavorites()

  return (
    <div>
      <Navbar />
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Trending" data={movieList} />
        <MovieList title="Favorites" data={favoritesList} />
      </div>
      
    </div>
  )
}

/*


      <div className='bg-gray-500' >
        <div className='h-96' ></div>
        <div className='h-96' ></div>  
      </div>



 */