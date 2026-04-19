import React from 'react'

const Settings = ({handleLogout}) => {
  return (
    <>
    
    <div className='flex justify-between'>
        <p>Settings</p>
        <button onClick={handleLogout} className='text-sm text-white bg-red-500 hover:bg-red-400 px-2 py-1 font-bold rounded-2xl cursor-pointer' >Logout</button>
    </div>
    
    </>
  )
}

export default Settings