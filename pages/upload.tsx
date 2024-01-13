import useCurrentUser from "@/hooks/useCurrentUser"
import prismadb from "@/lib/prismadb"
import axios from "axios"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback } from "react"

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

    const { data: user } = useCurrentUser()
    const router = useRouter()

    const movies = [
        {
           "title":"Big Buck Bunny",
           "description":"Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
           "thumbnailUrl":"https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
           "genre":"Comedy",
           "duration":"10 minutes"
        },
        {
           "title":"Sintel",
           "description":"A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
           "thumbnailUrl":"http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
           "genre":"Adventure",
           "duration":"15 minutes"
        },
        {
           "title":"Tears of Steel",
           "description":"In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots that threatens the planet.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
           "thumbnailUrl":"https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg",
           "genre":"Action",
           "duration":"12 minutes"
        },
        {
           "title":"Elephant's Dream",
           "description":"Friends Proog and Emo journey inside the folds of a seemingly infinite Machine, exploring the dark and twisted complex of wires, gears, and cogs, until a moment of conflict negates all their assumptions.",
           "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
           "thumbnailUrl":"https://download.blender.org/ED/cover.jpg",
           "genre":"Sci-Fi",
           "duration":"15 minutes"
        }
     ]

    const uploadMovie = async () => {
        for (let i=0 ; i < movies.length ; i++) {

            await axios.post("/api/upload", {
                data: movies[i]
            }).then(() => {
                console.log("Upload Success")
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    // For debug help purposes
    // const debugFunction = async () => {
    //     await axios.get("/api/random")
    //     .then(() => {
    //         console.log("Random Success")
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    return (
        <div className='flex items-center h-full justify-center'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-6xl text-white text-center'>Upload Movie</h1>
                <div className='flex items-center justify-center gap-8 mt-10'>
                    <div onClick={() => uploadMovie()}>

                        <div className='group flex-row w-44 mx-auto'>
                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="images/default-green.png" alt="Profile" />
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                Click Image to Upload
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Upload