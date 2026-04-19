import React from 'react'
import Dashboard from './content-section-components/Dashboard'
import Mess from './content-section-components/Mess'
import Verity from './content-section-components/Verity'
import Payment from './content-section-components/Payment'
import User from './content-section-components/User'
import Plan from './content-section-components/Plan'
import Settings from './content-section-components/Settings'

const ContentSection = ({tab, handleLogout}) => {
  return (
    <div className='bg-[#171717] flex-1 rounded-2xl p-5 overflow-auto'>

      {tab === "dashboard" && <Dashboard/>}
      {tab === "mess" && <Mess/>}
      {tab === "verity" && <Verity/>}
      {tab === "payment" && <Payment/>}
      {tab === "user" && <User/>}
      {tab === "plan" && <Plan/>}
      {tab === "settings" && <Settings handleLogout={handleLogout} />}

    </div>
  )
}

export default ContentSection