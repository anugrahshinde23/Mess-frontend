import React from 'react'

const Settings = ({handleLogout}) => {
  return (
    <>
    
    <div className='p-10 flex justify-between' >
        <p className='text-3xl font-bold text-indigo-500' >Settings</p>
        <div>
            <button className='bg-red-500 text-white font-bold p-2 rounded-full cursor-pointer hover:bg-red-400' onClick={handleLogout} >
                Logout
            </button>
        </div>
    </div>
    
    </>
  )
}

export default Settings