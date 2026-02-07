import React from 'react'
import * as MaterialDesignIcons from "react-icons/md";

const Footer = () => {
  return (
    <>
    
    <div className='mx-15 mb-5  px-20 py-10 bg-zinc-200 rounded-2xl text-indigo-500 flex flex-col '>

        <div className='flex text-indigo-500 justify-between '>
            <div className='text-2xl w-1/2 font-bold'>MessMate</div>
            <div className='flex justify-between w-1/2'>
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