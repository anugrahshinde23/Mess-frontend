import React from 'react'
import Navbar from '../components/home-components/Navbar'
import Banner from '../components/home-components/Banner'
import OurServices from '../components/home-components/OurServices'
import HaveMess from '../components/home-components/HaveMess'
import BecomeDeliveryBoy from '../components/home-components/BecomeDeliveryBoy'

const Home = () => {
  return (
    <>
    
     <Navbar/>
     <Banner/>
     <OurServices/>
     <HaveMess/>
    <BecomeDeliveryBoy/>
    </>
  )
}

export default Home