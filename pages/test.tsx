import MultiFileUpload from "@/components/MultiFileUpload"
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

const Test = () => {

    const { data: user } = useCurrentUser()
    const router = useRouter()


    // Imports the Google Cloud client library

    // For more information on ways to initialize Storage, please see
    // https://googleapis.dev/nodejs/storage/latest/Storage.html

    // Creates a client using Application Default Credentials
    // const storage = new Storage();

    // Creates a client from a Google service account key
    

    // /**
    //  * TODO(developer): Uncomment these variables before running the sample.
    //  */
    // // The ID of your GCS bucket
    // const bucketName = 'test-bucket-vid';

    // // async function createBucket() {
    // //     await storage.createBucket(bucketName, {
    // //         'ASIA',
    // //         [storageClass]: true,
    // //       });
    // //     console.log(`Bucket ${bucketName} created.`);
    // // }

    //     // createBucket().catch(console.error);

    // async function getBucketVideo() {
    //     await storage.bucket('test-bucket-vid').file('BigBuckBunny.mp4').download()
    //     console.log(`Bucket ${bucketName} created.`);
    // }




    return (
        <div className='flex items-center h-full justify-center'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-6xl text-white text-center'>Test Page</h1>
                <div className='flex items-center justify-center gap-8 mt-10'>
                    <div>
                    {/* <video 
                        id='watch-video'
                        src='https://storage.cloud.google.com/test-bucket-vid/BigBuckBunny.mp4' 
                        className="h-full w-full"
                        controls
                    ></video> */}

                        <MultiFileUpload />

                        <div className='group flex-row w-44 mx-auto'>
                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="images/default-green.png" alt="Profile" />
                            </div>
                            
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                CLmao
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Test