import React from 'react'
import DataGuard from '../assets/DataGuard.mov'
const VideoSection = () => {
    return (
        <section className='w-full pb-16 flex items-center justify-center h-auto bg-darkbg min-h-screen'>
           
           
           <video className="w-[800px] h-[500px] border rounded-lg dark:border-gray-700 
            transition duration-300 
            hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]" 
            autoPlay controls>
            <source src={DataGuard} type="video/mp4" />
        </video>

        </section>
    )
}

export default VideoSection