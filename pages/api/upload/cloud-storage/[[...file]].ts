import type {NextApiRequest, NextApiResponse} from 'next'

import { Server } from '@tus/server'
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

// Connect to GCS
const storage = new Storage({keyFilename: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE})

// Backend API Endpoint for uploading a File into Google Cloud Storage
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Destination bucket name
    const bucketDest = req.headers['bucket'] as string;

    // Connect to GCS
    const tusServer = new Server({
        path: '/api/upload/cloud-storage', // Directory name
        datastore: new GCSStore({
          bucket: storage.bucket(bucketDest),
        }),
    })
    
    // Sent to GCS
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
