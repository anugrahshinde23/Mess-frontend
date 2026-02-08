import React from 'react'

const Settings = ({logout}) => {
  return (
    <>
    
    <div className='p-10 flex justify-between'>
      <p className='text-2xl font-bold text-indigo-500'>Settings</p>
      <button className='bg-red-500 px-5 py-2 rounded-2xl hover:bg-red-400 cursor-pointer text-white font-bold text-sm' onClick={logout}>Logout</button>
    </div>
    
    </>
  )
}

export default Settings