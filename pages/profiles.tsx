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

const Profiles = () => {
    return (
        <div>
            <p className='text-white text-4xl'>Profiles</p>
        </div>
    )
}

export default Profiles