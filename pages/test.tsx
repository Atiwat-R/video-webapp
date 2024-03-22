import UploadMovie from "@/components/UploadMovie"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";


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

const Test = () => {

    const router = useRouter()

    return (
        <div className="mt-10 ml-4 mb-10">
            <AiOutlineArrowLeft id='home-page-button' onClick={() => router.push('/')} size={40} className="text-white hover:opacity-70 focus:opacity-50 active:opacity-50 cursor-pointer absolute top-0 left-0 mt-7 ml-5" />
            <div className='flex items-center h-full justify-center'>
                <div className='flex flex-col'>
                    <h6 className='text-white text-center text-5xl md:text-5xl h-full lg:text-5xl font-bold drop-shadow-xl'>Upload Movies</h6>
                    <div className='flex items-center justify-center gap-8 mt-8'>
                        <UploadMovie />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Test

// hover:opacity-70 focus:opacity-50 active:opacity-50