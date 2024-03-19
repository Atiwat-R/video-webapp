import React, { useRef, useState } from 'react';
import Input from "@/components/input";
import InputTextArea from './InputTextArea';
import axios from 'axios';
import * as tus from 'tus-js-client'


const UploadMovie = () => {

  const [movieName, setMovieName] = useState("");
  const [movieDesc, setMovieDesc] = useState("");

  const movieFileInputRef = useRef<HTMLInputElement>(null);
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [movieDuration, setMovieDuration] = useState<number | undefined>()

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle when User Inputted a Movie File
  const handleMovieFileChange = async (event: React.ChangeEvent<HTMLInputElement>,) => {
      const file = event.target.files && event.target.files[0];
      
      if (file) {
        setMovieFile(file)
        
        await getVideoDuration(file)
          .then(duration => setMovieDuration(duration)) // Update state with duration
          .catch(() => new Error("ERRA")); // Set null on error
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

  // View the inputted Video in-browser
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

  // View the inputted Image in-browser
  const handleClickInputtedThumbnail = (file: File | null) => {
      // Exit the function if there's no file
      if (file == null) { return }

      // Assuming 'file' contains the image data
      const imageData = file; // Replace this with your actual file data

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
      alert("Processing, please retry in a few seconds")
      return false
    }
    return true
  }

  const uploadDaMovie = (file: File) => {

      // Create a new tus upload
      var upload = new tus.Upload(file, {
        endpoint: '/api/upload_tus',
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError: function (error) {
          console.log('Failed because: ' + error)
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
          setUploadProgress(Number(percentage))
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        onSuccess: function () {
          console.log('Success TUS')
        },
      })

      // Check if there are any previous uploads to continue.
      upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0])
        }

        // Start the upload
        upload.start()
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
  
    const jsonData = {
      "movieName": movieName,
      "movieDesc": movieDesc,
      "movieDuration": secondsToMinutes(movieDuration),
    };
  
    const formData = new FormData();
    if (movieFile && thumbnailFile) {
      formData.append('movieFile', movieFile);
      // formData.append('thumbnailFile', thumbnailFile);
      // formData.append('jsonData', JSON.stringify(jsonData));
    }

    console.log(formData)

    if (movieFile !== null) uploadDaMovie(movieFile)
    


  //   try {
  //     // Show loading indicator
  //     setLoading(true);
  
  //     await axios.post("/api/upload_movie", formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       transformRequest: formData => formData,
  //       // Track upload progress
  //       onUploadProgress: progressEvent => {
  //         const { loaded, total } = progressEvent;
  //         if (!total) return
  //         const progress = Math.round((loaded * 100) / total);
  //         setUploadProgress(progress);
  //       }
  //     });
  //     console.log("Upload Success");
  //   } 
  //   catch (error) {
  //     console.log(error);
  //     // Handle error
  //   } finally {
  //     // Hide loading indicator
  //     setLoading(false);
  //     setUploadProgress(0);
  //   }
  };

  return (

    <div className='text-white flex justify-center'>
        <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 rounded-md w-full space-y-4'>
          {uploadProgress}
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

            
        </div>
    </div>
  );
};

export default UploadMovie;













  // Get duration of the video





  // const getVideoDuration = (file: File | null): Promise<number | null> => {
  //   // Error if there's no file
  //   if (file == null) { throw new Error("No file") }
  
  //   // There's video data in File
  //   const videoData = file;
  
  //   // Create a Blob from the video data
  //   const blob = new Blob([videoData]);
  
  //   // Create a URL for the Blob
  //   const blobURL = URL.createObjectURL(blob);
  
  //   // Promise to handle asynchronous video loading
  //   return new Promise((resolve, reject) => {
  //     const video = document.createElement('video');
  //     video.src = blobURL;
  
  //     // Listen for the 'loadedmetadata' event
  //     video.addEventListener('loadedmetadata', function() {
  //       const duration = video.duration;
  //       resolve(duration); // Resolve the promise with duration
  //       URL.revokeObjectURL(blobURL); // Cleanup
  //       video.remove(); // Remove the video element
  //     });
  
  //     // Optional: Handle errors during loading
  //     video.addEventListener('error', (error) => {
  //       reject(error); // Reject the promise with error
  //       URL.revokeObjectURL(blobURL);
  //       video.remove();
  //     });
  
  //     // Append the video element (needed for some browsers)
  //     document.body.appendChild(video);
  //   });
  // };

  // const setVideoDuration = (file: File | null) => {
  //   // Exit the function if there's no file
  //   if (file == null) { return }

  //   // There's video data in File
  //   const videoData = file; 

  //   // Create a Blob from the video data
  //   const blob = new Blob([videoData]);

  //   // Create a URL for the Blob
  //   const blobURL = URL.createObjectURL(blob);

  //   // Create a video element
  //   const video = document.createElement('video');
  //   video.src = blobURL;

  //   // Listen for the 'loadedmetadata' event to ensure video metadata is loaded
  //   video.addEventListener('loadedmetadata', function() {
  //     const duration = video.duration;
  //     console.log(duration)
  //     setMovieDuration(duration)
  //   });

  //   // Append the video element to the document body to trigger loading
  //   document.body.appendChild(video);

  //   return video.duration

  // }