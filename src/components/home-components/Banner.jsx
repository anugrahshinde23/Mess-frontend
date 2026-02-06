import React from 'react'
import messBanner from '../../assests/images/messBanner.png'

const Banner = () => {
  return (
    <>
    
     <div className=' mx-10 sm:mx-15 mt-4 mb-10' >
     <img className='rounded-4xl  object-cover 
    shadow-lg shadow-black/20
    transition-all duration-300
    hover:-translate-y-2 hover:shadow-2xl'  src={messBanner} alt="" />
     </div>
    
    </>
  )
}

export default Banner