import Navbar from "@/components/Navbar"
import useCurrentUser from "@/hooks/useCurrentUser"
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

  return (
    <div>
      <Navbar />
      


      
      
    </div>
  )
}

/*


      <div className='bg-gray-500' >
        <div className='h-96' ></div>
        <div className='h-96' ></div>  
      </div>



 */