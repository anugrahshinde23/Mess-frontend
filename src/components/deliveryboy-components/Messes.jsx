import React from 'react'

const Messes = ({dBoy}) => {


   const workingMessesData = dBoy.workingMesses


  return (
    <>

    <div className='p-10'>
        <p className='text-3xl text-indigo-500 font-bold'>Joined Messes</p>

        <div className='mt-10'>
            <div className='flex justify-between px-10 py-5  bg-zinc-300 rounded-2xl mb-5 font-bold'>
                <p>Mess</p>
                <p>Address</p>
                <p>Owner</p>
            </div>
            {workingMessesData.map((w) => (
                <div key={w._id} className='rounded-2xl w-full flex justify-between py-5 px-10 font-semibold bg-indigo-300'>
                    <p>{w.name}</p>
                    <p>{w.address}</p>
                    <p>{w.owner.name}</p>
                </div>
            ))}
        </div>
    </div>
    
    </>
  )
}

export default Messes