import type {NextApiRequest, NextApiResponse} from 'next'

import { Metadata, Server } from '@tus/server'
import { GCSStore } from '@tus/gcs-store'
import { Storage } from '@google-cloud/storage'

/**
 * !Important. This will tell Next.js NOT Parse the body as tus requires
 * @see https://nextjs.org/docs/api-routes/request-helpers
 */
export const config = {
  api: {
    bodyParser: false,
  },
}

const storage = new Storage({keyFilename: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE})

const tusServer = new Server({
  path: '/api/upload_tus', // Directory name
  datastore: new GCSStore({
    bucket: storage.bucket('video-webapp-all-movies'),
  }),
})

// Backend API Endpoint for uploading File into Google Cloud Storage
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await tusServer.handle(req, res)
    .then(() => {
        console.log("Upload Success")
        return res.status(200)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Upload error' })
    })

}


// const myPath = path.join(process.cwd(), 'tempMovie')
// datastore: new FileStore({directory: myPath}),

// await tusServer.handle(req, res)
// .then(() => {
//     const fileNameFull = req.headers['x-invoke-path'] as string
//     const lastSlashIndex = fileNameFull?.lastIndexOf('/');
//     const fileName = fileNameFull?.substring(lastSlashIndex + 1)

//     // console.log(fileNameFull) 
//     // console.log(fileName) 

//     // return res.status(200).json({fileName: fileName});
// })
// .catch((error) => {
//     console.log(error)
//     res.status(500).json({ message: 'Upload error' })
// })