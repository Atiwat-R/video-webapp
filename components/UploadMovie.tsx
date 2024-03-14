import React, { useRef, useState } from 'react';
import Input from "@/components/input";
import InputTextArea from './InputTextArea';


const UploadMovie = () => {

  const [movieName, setMovieName] = useState("");
  const [movieDesc, setMovieDesc] = useState("");

  const movieFileInputRef = useRef<HTMLInputElement>(null);
  const [movieFile, setMovieFile] = useState<File | null>(null);

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  
  const handleMovieFileChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setMovieFile(file);
      }
  }
  const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>,) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setThumbnailFile(file);
      }
  }

  const handleSubmit = () => {
    console.log(movieFile)
    return movieFile
  }

  const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // When user chose the Movie, they can view the Movie in-browser
  const handleClickInputtedMovie = (file: File | null) => {
      // Exit the function if there's no file
      if (file == null) { return }

      // There's video data in File
      const videoData = file

      // Create a Blob from the video data
      const blob = new Blob([videoData], { type: 'video/mp4' });

      // Create a URL for the Blob
      const blobURL = URL.createObjectURL(blob);

      // Open the Blob URL in a new tab
      const newTab = window.open();
      newTab?.document.write('<html><body><video controls src="' + blobURL + '"></video></body></html>');
  }

    // When user chose the Movie, they can view the Movie in-browser
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