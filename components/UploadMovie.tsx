import React, { useRef, useState } from 'react';
import Input from "@/components/input";
import InputTextArea from './InputTextArea';


const UploadMovie = () => {

  const [movieName, setMovieName] = useState("");
  const [movieDesc, setMovieDesc] = useState("");

  const movieFileInputRef = useRef<HTMLInputElement>(null);
  const [movieFile, setMovieFile] = useState<File | null>(null);
  const [movieDuration, setMovieDuration] = useState<number | null>(null)

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Handle when User Inputted a Movie File
  const handleMovieFileChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setMovieFile(file);

      }

      console.log("Video duration:", movieDuration);
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
      newTab?.document.write('<html><body><video controls src="' + blobURL + '"></video></body></html>');
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

  // Submit all new data to Storage
  const handleSubmit = () => {
    if (
      movieName == "" ||
      movieDesc == "" ||
      movieFile == null ||
      thumbnailFile == null
    ) {
      alert("Incomplete Parameters")
      return
    }

    // console.log(movieFile)
    return
  }

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