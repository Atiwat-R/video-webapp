import React, { useRef, useState } from 'react';

const MultiFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files)); // Convert FileList to an array
    }
  };

  const handleSubmit = () => {
    console.log(selectedFiles)
    for (let i=0 ; i<selectedFiles.length ; i++) {
        console.log(selectedFiles[i].name)
    }
    return selectedFiles
  }

  return (
    <div className='text-white flex justify-center'>
        <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2  rounded-md w-full'>

            
            <label htmlFor="files" className="text-white text-4xl mb-8 font-semibold">
                Upload Multiple Files:
            </label>
            <input
                type="file"
                id="upload-files"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                className="mb-4 hidden"
            />
            <br />
            <ul className="mt-4">
                {selectedFiles.map((file) => (
                <li key={file.name} className="py-1 text-gray-400">{file.name}</li>
                ))}
            </ul>
            <button onClick={() => fileInputRef.current?.click()} className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Select Files
            </button>
            <button onClick={() => handleSubmit()} className='text-red-500 hover:text-red-700 font-bold mt-4 py-2 px-4 rounded text-right'>
                Submit
            </button>
        </div>
    </div>
  );
};

export default MultiFileUpload;









{/* <div className='flex justify-center'>
    <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
        <h2 className='text-white text-4xl mb-8 font-semibold'>
            Register
        </h2>
        <div className='flex flex-col gap-4'>
        </div>
        <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition active:bg-red-800'>
            Sign up
        </button>
        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition active:opacity-90">
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition active:opacity-90">
            </div>
        </div>
        <p className="text-neutral-500 mt-12 flex justify-center">
            Already have an account?
            <span className="text-white ml-1 hover:underline cursor-pointer">
            </span>
        </p>
    </div>
</div> */}





