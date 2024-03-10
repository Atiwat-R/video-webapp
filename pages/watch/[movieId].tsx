import React, { useEffect, useState } from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";

import { AiOutlineArrowLeft } from "react-icons/ai";

// If [ movieId = 5678 ] this file will have path [ /api/movies/5678 ]


const Watch = () => {
    const router = useRouter()
    const { movieId } = router.query
    const { data } = useMovie(movieId as string)

    const visible = true // For hiding upper navbar. May implement later

    return (
        <div id='watch' className="h-screen w-screen bg-black">
            <nav className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 ${visible? "" : "hidden"}`}>
                <AiOutlineArrowLeft id='home-page-button' onClick={() => router.push('/')} size={40} className="text-white cursor-pointer" />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">
                        Watching:
                    </span>
                    {" " + data?.title}
                </p>
            </nav>
            <video 
                id='watch-video'
                src={data?.videoUrl} 
                className="h-full w-full"
                autoPlay
                controls
            ></video>
        </div>
    )
}


export default Watch







