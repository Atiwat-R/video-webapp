import { NextApiRequest, NextApiResponse } from 'next';
import { transferManager } from '@/lib/cloudStorage';

// Backend API Endpoint for Uploading Movies
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if request is POST
        if (req.method !== 'POST') {
            return res.status(405).end(); // Error 405 Method Not Allowed
        }
  
        console.log("CLOUD UPLOAD API")
        console.log(req.body.data)

        const { movieName, movieDesc, movieDuration, movieFile, thumbnailFile } = req.body.data

        const movieData = {
            "title": movieName,
            "description":movieDesc,
            "videoUrl":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "thumbnailUrl":"https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
            "genre":"Comedy",
            "duration":"10 minutes"
        }

        const bucketName = "https://console.cloud.google.com/storage/browser/video-webapp-all-movies"
        const newMovies = [""]

        const uploader = transferManager(bucketName)
        await uploader.uploadManyFiles(newMovies);

        for (const filePath of newMovies) {
            console.log(`${filePath} uploaded to ${bucketName}.`);
        }
  

        return res.status(200).json({'Success':1});

    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}


// https://console.cloud.google.com/storage/browser/video-webapp-all-movies



