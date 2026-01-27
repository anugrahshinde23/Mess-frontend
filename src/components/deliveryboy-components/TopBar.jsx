import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Messes from './Messes'
import Orders from './Orders'
import Settings from './Settings'

const TopBar = ({dBoy}) => {

  const [activeTab, setActivetTab] = useState("tab1")


  const dBoyTab = [
    {id: "tab1", label: "Dashboard" },
    {id: "tab2", label: "Messes"},
    {id: "tab3", label: "Orders"},
    {id: "tab4", label: "Settings"}
  ]


  return (
    <>
    
    <div className='p-5 border rounded-2xl border-indigo-500 mt-10 
     mx-26 flex justify-between items-center px-10'>
        {dBoyTab.map((d)=>(
            <div key={d.id} onClick={() => {
              setActivetTab(d.id)
            }}
            className={`${activeTab === d.id ? 'bg-indigo-500 text-white font-bold cursor-pointer px-3 py-2 rounded-2xl text-sm':'text-sm cursor-pointer hover:bg-zinc-300 px-3 py-2 rounded-2xl'}`}
            >
                {d.label}
            </div>
        ))}
    </div>
    <div className='h-150 mx-26 my-10 rounded-2xl overflow-auto border border-indigo-500'>
      {activeTab === "tab1" && <Dashboard/>}
      {activeTab === "tab2" && <Messes dBoy={dBoy}/>}
      {activeTab === "tab3" && <Orders dBoy={dBoy}/>}
      {activeTab === "tab4" && <Settings/>}
    </div>
    </>
  )
}

export default TopBar