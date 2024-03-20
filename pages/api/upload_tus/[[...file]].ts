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

const storage = new Storage({keyFilename: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE})


const tusServer = new Server({
  path: '/api/upload_tus',
  datastore: new GCSStore({
    bucket: storage.bucket('video-webapp-all-movies'),
  }),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await tusServer.handle(req, res)
    .then(() => {
        console.log(res.statusMessage) 
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Upload error' })
    })
}


// const myPath = path.join(process.cwd(), 'tempMovie')
// datastore: new FileStore({directory: myPath}),