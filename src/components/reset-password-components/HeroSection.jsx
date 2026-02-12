import React, { useState } from 'react'

import VerifyOTP from './VerifyOTP'
import ResetPassword from './ResetPassword'
import ResetDone from './ResetDone'
import SendOTP from './SendOTP'



const HeroSection = () => {

 const [tab, setTab] = useState("tab1")
 const [phoneNumber, setPhoneNumber] = useState("")

  return (
    <>
    
    <div className=' h-screen flex flex-col justify-center items-center'>
        {tab === "tab1" && <SendOTP setTab={setTab} setPhoneNumber={setPhoneNumber}/>}
        {tab === "tab2" && <VerifyOTP phoneNumber={phoneNumber} setTab={setTab}/>}
        {tab === "tab3" && <ResetPassword phoneNumber={phoneNumber} setTab={setTab}/>}
        {tab === "tab4" && <ResetDone />}
    </div>
    </>
  )
}

export default HeroSection