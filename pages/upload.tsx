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

const Upload = () => {

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

export default Upload

// hover:opacity-70 focus:opacity-50 active:opacity-50






// const movies = [
//     {
//        "title":"Big Buck Bunny",
//        "description":"Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
//        "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//        "thumbnailUrl":"https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
//        "genre":"Comedy",
//        "duration":"10 minutes"
//     },
//     {
//        "title":"Sintel",
//        "description":"A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
//        "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
//        "thumbnailUrl":"http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
//        "genre":"Adventure",
//        "duration":"15 minutes"
//     },
//     {
//        "title":"Tears of Steel",
//        "description":"In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots that threatens the planet.",
//        "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
//        "thumbnailUrl":"https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
//        "genre":"Action",
//        "duration":"12 minutes"
//     },
//     {
//        "title":"Elephant's Dream",
//        "description":"Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
//        "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//        "thumbnailUrl":"https://download.blender.org/ED/cover.jpg",
//        "genre":"Sci-Fi",
//        "duration":"15 minutes"
//     }
//  ]