import type {NextApiRequest, NextApiResponse} from 'next'
import {Server, Upload} from '@tus/server'
import {FileStore} from '@tus/file-store'
import path from 'path'

/**
 * !Important. This will tell Next.js NOT Parse the body as tus requires
 * @see https://nextjs.org/docs/api-routes/request-helpers
 */
export const config = {
  api: {
    bodyParser: false,
  },
}

const myPath = path.join(process.cwd(), 'tempMovie')

const tusServer = new Server({
  // `path` needs to match the route declared by the next file router
  // ie /api/upload
  path: '/api/upload_movie_tus',
  datastore: new FileStore({directory: myPath}),
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return tusServer.handle(req, res)
}