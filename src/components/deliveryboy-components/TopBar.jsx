import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Messes from './Messes'
import Orders from './Orders'
import Settings from './Settings'
import Wallet from './Wallet'

const TopBar = ({dBoy, logout}) => {

  const [activeTab, setActivetTab] = useState("tab1")


  const dBoyTab = [
    {id: "tab1", label: "Dashboard" },
    {id: "tab2", label: "Messes"},
    {id: "tab3", label: "Orders"},
    {id: "tab4", label: "Wallet"},
    {id: "tab5", label: "Settings"}
  ]


  return (
    <>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10">

{/* TAB BAR */}
<div className="bg-white border border-zinc-300 rounded-xl shadow-sm px-4 py-3 flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth">

  {dBoyTab.map((d) => (
    <button
      key={d.id}
      onClick={() => setActivetTab(d.id)}
      className={`px-4 py-2 text-sm rounded-lg transition font-medium
      ${
        activeTab === d.id
          ? "bg-indigo-600 text-white shadow"
          : "text-zinc-600 hover:bg-zinc-100"
      }`}
    >
      {d.label}
    </button>
  ))}

</div>


{/* TAB CONTENT */}
<div className="my-6  bg-white border border-zinc-300 rounded-xl shadow-sm p-6  overflow-auto">

  {activeTab === "tab1" && <Dashboard />}
  {activeTab === "tab2" && <Messes dBoy={dBoy} />}
  {activeTab === "tab3" && <Orders dBoy={dBoy} />}
  {activeTab === "tab4" && <Wallet dBoy={dBoy} />}
  {activeTab === "tab5" && <Settings logout={logout} />}

</div>

</div>
    </>
  )
}

export default TopBar