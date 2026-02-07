import React from 'react'
import Navbar from '../components/home-components/Navbar'
import Banner from '../components/home-components/Banner'
import OurServices from '../components/home-components/OurServices'
import HaveMess from '../components/home-components/HaveMess'
import BecomeDeliveryBoy from '../components/home-components/BecomeDeliveryBoy'
import OurTeam from '../components/home-components/OurTeam'
import Footer from '../components/home-components/Footer'

const Home = () => {
  return (
    <>
    
     <Navbar/>
     <Banner/>
     <OurServices/>
     <HaveMess/>
    <BecomeDeliveryBoy/>
    <OurTeam/>
    <Footer/>
    </>
  )
}

export default Home