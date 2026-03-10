import React from 'react'
import vid from '../assests/videos/404.mp4'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {


    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }
  return (
    <>
    
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 1. The Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source
          src={vid} 
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* 2. Optional Overlay (Darkens the video so text is readable) */}
      <div className="absolute z-10 w-full h-full bg-black/40"></div>

      {/* 3. The Text Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold  mb-7">
          You Got, <span className="text-indigo-400">Lost.</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl font-mono mx-auto">
          It seem like something went wrong we can't find what you are looking for Let's bring you back to the
          place we know
        </p>
        <div className='flex gap-4 justify-center'>
        <button onClick={navigateToHome} className="px-8 py-3 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded font-semibold transition-all cursor-pointer">
          Go Back
        </button>
        <button onClick={navigateToHome} className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded font-semibold transition-all cursor-pointer">
          Back To Home
        </button>
        </div>
      </div>
    </div>

 
    
    </>
  )
}

export default NotFound