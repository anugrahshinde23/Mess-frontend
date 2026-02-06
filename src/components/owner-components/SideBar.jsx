import React, { useState } from 'react'

const SideBar = ({activeTab, setActiveTab}) => {

  

  const tabs = [
    { id: "tab1", label: "Dashboard" },
    { id: "tab2", label: "Shop" },
    { id: "tab3", label: "Orders" },
    { id: "tab4", label: "Delivery Boy" },
    { id: "tab5", label: "Menu" },
    { id: "tab6", label: "Plans" },
    { id: "tab7", label : "Settings" }
  ]

  return (
    <div className="  sm:h-160
  text-sm
  bg-zinc-200
  max-w-full
  sm:w-1/6
  rounded-2xl
  mx-4
  sm:ml-4
  flex
  flex-row
  sm:flex-col
  gap-3
  p-4
  overflow-x-auto
  sm:overflow-visible
  whitespace-nowrap
  scroll-smooth
  no-scrollbar
  ">

      {tabs.map((tab) => (
        <p
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`cursor-pointer px-4 py-2 rounded-lg 
            ${activeTab === tab.id
              ? 'bg-indigo-500 text-white font-bold'
              : 'text-gray-600 hover:bg-gray-300'}
          `}
        >
          {tab.label}
        </p>
      ))}

    </div>
  )
}

export default SideBar
