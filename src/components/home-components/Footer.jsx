import React from 'react'
import * as MaterialDesignIcons from "react-icons/md";

const Footer = () => {
  return (
    <>
    
    <div className='mx-15 mb-5 mt-50 sm:mt-0 px-10 py-5 sm:px-20 sm:py-10 bg-zinc-200 rounded-2xl text-indigo-500 flex flex-col '>

        <div className='flex flex-col gap-5 sm:gap-0 sm:flex-row text-indigo-500 justify-between items-center sm:items-start '>
            <div className='text-2xl w-full sm:w-1/2 font-bold  sm:text-start text-center'>MessMate</div>
            <div className=' flex flex-col   sm:flex-row items-center sm:justify-between w-full sm:w-1/2'>
                <div className='flex flex-col  gap-3'>
                    <div>
                    <p className='text-sm text-gray-400 font-semibold'>Product</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                    <p>Overview</p>
                    <p>Features</p>
                    <p>Solutions</p>
                    <p>Tutorials</p>
                    <p>Pricing</p>
                    <p>Releases</p>
                    </div>
                </div>
                <div>
                <div className='flex flex-col gap-3'>
                    <div>
                    <p className='text-sm text-gray-400 font-semibold'>Product</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                    <p>Overview</p>
                    <p>Features</p>
                    <p>Solutions</p>
                    <p>Tutorials</p>
                    <p>Pricing</p>
                    <p>Releases</p>
                    </div>
                </div>
                </div>
                <div>
                <div className='flex flex-col gap-3'>
                    <div>
                    <p className='text-sm text-gray-400 font-semibold'>Product</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                    <p>Overview</p>
                    <p>Features</p>
                    <p>Solutions</p>
                    <p>Tutorials</p>
                    <p>Pricing</p>
                    <p>Releases</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <hr className='my-10 text-indigo-500 '/>
        <div className='flex gap-1 text-indigo-500 items-center'>
            <MaterialDesignIcons.MdCopyright/>
            <p className='text-sm'>2026 MessMate. All Rights Reserved</p>
        </div>

    </div>
    
    </>
  )
}

export default Footer