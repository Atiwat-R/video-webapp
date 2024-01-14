import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import Navbar from "@/components/Navbar"
import useCurrentUser from "@/hooks/useCurrentUser"
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

  const { data: user } = useCurrentUser()
  const { data: movieList = [] } = useMovieList()

  return (
    <div>
      <Navbar />
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Trending" data={movieList} />
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