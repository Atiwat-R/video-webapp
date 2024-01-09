import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { signOut, getSession } from "next-auth/react"

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
    <>
      <h1 className='text-7xl text-neutral-300' >Welcome { user?.name }</h1>
      <button onClick={() => signOut()} className='h-10 w-full bg-white'>Logout</button>
    </>
  )
}

