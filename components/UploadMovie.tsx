import React, { useRef, useState } from 'react';
import Input from "@/components/input";
import InputTextArea from './InputTextArea';
import axios from 'axios';
import * as tus from 'tus-js-client'
import { Hash } from 'crypto';


const UploadMovie = () => {

  const [movieName, setMovieName] = useState("");
  const [movieDesc, setMovieDesc] = useState("");

  const movieFileInputRef = useRef<HTMLInputElement>(null);
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [movieDuration, setMovieDuration] = useState<number | undefined>()

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [movieUploadProgress, setMovieUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);


  // Handle when User Inputted a Movie File
  const handleMovieFileChange = async (event: React.ChangeEvent<HTMLInputElement>,) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setMovieFile(file)
        await getVideoDuration(file)
          .then(duration => setMovieDuration(duration)) // Update state with duration
          .catch(() => new Error("Error")); // Set null on error
      }

  }
  // Handle when User Inputted an Image File
  const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setThumbnailFile(file);
      }
  }

  // Handle clicking a button
  const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // For user viewing the inputted Video in-browser
  const handleClickInputtedMovie = (file: File | null) => {
      // Exit the function if there's no file
      if (file == null) { return }

      // There's video data in File
      const videoData = file

      // Create a Blob from the video data
      const blob = new Blob([videoData]);

      // Create a URL for the Blob
      const blobURL = URL.createObjectURL(blob);

      // Open the Blob URL in a new tab
      const newTab = window.open();
      newTab?.document.write('<html><body><video controls id="inputted-movie" src="' + blobURL + '"></video></body></html>');
  }

  // For user viewing the inputted Image in-browser
  const handleClickInputtedThumbnail = (file: File | null) => {
      // Exit the function if there's no file
      if (file == null) { return }

      // Data in file
      const imageData = file; 

      // Create a Blob from the image data
      const blob = new Blob([imageData]);

      // Create a data URI from the Blob
      const reader = new FileReader();

      reader.onload = function(event?) {
        const dataURI = event?.target?.result;
        
        // Open the data URI in a new tab
        const newTab = window.open();
        newTab?.document.write('<html><body><img src="' + dataURI + '"></body></html>');
      };

      reader.readAsDataURL(blob);
  }

  // Get duration for a video
  const getVideoDuration = async (file: File | null): Promise<number | undefined> => {
    if (!file) return;
    
    const reader = new FileReader();
  
    return new Promise<number>((resolve, reject) => {
      reader.onload = () => {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          const duration = video.duration;
          resolve(duration);
        };
        video.src = String(reader.result);
      };
  
      reader.onerror = () => {
        reject(new Error('Error reading video file'));
      };
    
      reader.readAsDataURL(file);
    });
  };

  // Helper for handleSubmit. Checks if all info are complete
  const isInputsComplete = () => {
    if (
      movieName == "" ||
      movieDesc == "" ||
      movieFile == null ||
      thumbnailFile == null
    ) {
      alert("Please Fill In All Parameters")
      return false
    }
    else if (movieDuration == undefined) {
      // alert("Processing, please retry in a few seconds")
      // return false

      setMovieDuration(0)
      return true
    }
    return true
  }

  // Upload file using Resumable Upload
  const resumableUploadFile = (file: File, bucket: string, setProgress?: Function): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      // Create a new tus upload
      var upload = new tus.Upload(file, {
        endpoint: '/api/upload/cloud-storage',
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        headers: {
          bucket: bucket // Header data is actually accessible in the backend
        },
        onError: function (error) {
          console.log('Failed because: ' + error)
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          if (setProgress !== undefined) {
            var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
            setProgress(Number(percentage))
            console.log(bytesUploaded, bytesTotal, percentage + '%')
          }
        },
        onSuccess: function () {
          console.log('Successfully Upload ' + file.name)
          // Extract new filename from URL and resolve it
          if (upload.url) {
            const lastSlashIndex = upload.url.lastIndexOf('/') 
            const newFilename = lastSlashIndex !== -1 ? upload.url.substring(lastSlashIndex + 1) : upload.url;
            resolve(newFilename);
          } else {
            reject(new Error('File URL not found'));
          }
        },
      });
    
      // Check if there are any previous uploads to continue.
      upload.findPreviousUploads().then(function (previousUploads: string | any[]) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
    
        // Start the upload
        upload.start();
      });
    });
  };

  // Upload Movie's Metadata and URLs to MongoDB
  const uploadJsonData = async (jsonData: any) => {
    await axios.post("/api/upload/database", {
        data: jsonData
    }).then(() => {
        console.log("Upload Json Data: Success")
    }).catch((error) => {
        console.log(error)
    })
  }

  // Turn seconds to minutes, returning a string
  const secondsToMinutes = (seconds: any) => {
    if (typeof seconds === 'number') {
      const minutes = Math.floor(seconds / 60)
      const formattedMinutes = minutes.toString()
      return `${formattedMinutes}`
    }
  }

  // Submit all new data to Storage
  const handleSubmit = async () => {

    if (!isInputsComplete()) {
      console.log("Incomplete");
      return;
    }

    var jsonData = {
      "title" : movieName,
      "description" : movieDesc,
      "videoUrl" : "",
      "thumbnailUrl" : "",
      "genre" : "Action",
      "duration" : secondsToMinutes(movieDuration) + " minutes"
   }

    setShowUploadProgress(true)

    // Upload Movie File
    const movie_bucket = process.env.NEXT_PUBLIC_MOVIES_BUCKET_NAME
    const thumbnail_bucket = process.env.NEXT_PUBLIC_THUMBNAIL_BUCKET_NAME

    if (movieFile && movie_bucket && thumbnailFile && thumbnail_bucket) {
      try {
        // Upload Movie File
        const movieFilename = await resumableUploadFile(movieFile, movie_bucket, setMovieUploadProgress);
        const movieUrl = `https://storage.googleapis.com/${movie_bucket}/${movieFilename}`;
        console.log(movieUrl);
        jsonData["videoUrl"] = movieUrl;
    
        // Upload Thumbnail File
        const thumbnailFilename = await resumableUploadFile(thumbnailFile, thumbnail_bucket, setThumbnailUploadProgress);
        const thumbnailUrl = `https://storage.googleapis.com/${thumbnail_bucket}/${thumbnailFilename}`;
        console.log(thumbnailUrl);
        jsonData["thumbnailUrl"] = thumbnailUrl;
    
        // Finally send JSON data
        await uploadJsonData(jsonData);
      } 
      catch (error) {
        console.error("Error at handleSubmit()", error);
      }
    }

    console.log(jsonData)
  };

  return (

    <div className='text-white flex justify-center'>
        <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 rounded-md w-full space-y-4'>
          <Input 
            id="movieName"
            onChange={(event: any) => setMovieName(event.target.value)}
            value={movieName}
            label="Title"
            type="movieName"
          />

          <InputTextArea 
            id="movieDesc" 
            onChange={(event: any) => setMovieDesc(event.target.value)}
            value={movieDesc}
            label="Description"
            rows={4} 
            cols={50} 
          />

          <div id="movie-file-upload">
            <input
              type="file"
              onChange={handleMovieFileChange}
              accept="video/mp4, video/webm, video/ogg, video/mpeg, video/quicktime, video/3gpp, video/x-flv, video/x-msvideo, video/x-ms-wmv, video/x-matroska"
              ref={movieFileInputRef}
              className="hidden"
            />
            <button onClick={() => handleButtonClick(movieFileInputRef)} className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Select Movie 
            </button>
            <button onClick={() => handleClickInputtedMovie(movieFile)} className='text-blue-600 underline hover:text-blue-700 font-bold mt-4 py-2 px-4 rounded text-right'>
              {movieFile?.name} 
            </button>
          </div>

          <div id="thumbnail-file-upload">
            <input
              type="file"
              onChange={handleThumbnailFileChange}
              accept="image/*"
              ref={thumbnailFileInputRef}
              className="hidden"
            />
            <button onClick={() => handleButtonClick(thumbnailFileInputRef)} className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Select Thumbnail 
            </button>
            <button onClick={() => handleClickInputtedThumbnail(thumbnailFile)} className='text-blue-600 underline hover:text-blue-700 font-bold mt-4 py-2 px-4 rounded text-right'>
              {thumbnailFile?.name} 
            </button>
          </div>

          <button onClick={() => handleSubmit()} className='text-red-500 hover:text-red-700 font-bold mt-4 py-2 px-4 rounded text-right'>
              Submit
          </button>

          <div id="upload-progress" className={"font-bold " + (showUploadProgress ? "" : "hidden")}>
            Uploading Movie: <span className={movieUploadProgress == 100 ? "text-green-400" : "text-orange-400"}> {movieUploadProgress}% </span> 
            <br />
            Uploading Thumbnail: <span className={thumbnailUploadProgress == 100 ? "text-green-400" : "text-orange-400"}> {thumbnailUploadProgress}% </span> 
          </div>
            
        </div>
    </div>
  );
};

export default UploadMovie;


// {movieLoading ? <span className='absolute text-white-900! font-bold'>{movieUploadProgress}</span> : null}


      // if (movieFile && movie_bucket && thumbnailFile && thumbnail_bucket) {

    //   // Upload Movie File
    //   await resumableUploadFile(movieFile, movie_bucket, setMovieUploadProgress)
    //     .then((newFilename) => {
    //       const movieUrl = "https://storage.cloud.google.com/" + movie_bucket + "/" + newFilename
    //       console.log(movieUrl);
    //       jsonData["movieUrl"] = movieUrl

    //       // Upload Thumbnail File
    //       resumableUploadFile(thumbnailFile, thumbnail_bucket, setThumbnailUploadProgress)
    //         .then((newFilename) => {
    //           const thumbnailUrl = "https://storage.cloud.google.com/" + thumbnail_bucket + "/" + newFilename
    //           console.log(thumbnailUrl);
    //           jsonData["thumbnailUrl"] = thumbnailUrl

    //           // Finally sent JSON over
    //           uploadJsonData(jsonData)
    //         })
    //     })
    // }