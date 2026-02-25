import React from "react";
import Navbar from "../components/home-components/Navbar";
import Banner from "../components/home-components/Banner";
import OurServices from "../components/home-components/OurServices";
import HaveMess from "../components/home-components/HaveMess";
import BecomeDeliveryBoy from "../components/home-components/BecomeDeliveryBoy";
import OurTeam from "../components/home-components/OurTeam";
import Footer from "../components/home-components/Footer";
import AnimatedSection from "../utils/Animation";
import ProgressNav from "../utils/ProgressNav";


const Home = () => {
  return (
    <>
     
      <AnimatedSection>
        <Navbar />
      </AnimatedSection>
      <AnimatedSection>
        <Banner />
      </AnimatedSection>
      <AnimatedSection>
        <OurServices />
      </AnimatedSection>
      <AnimatedSection>
        <HaveMess />
      </AnimatedSection>
      <AnimatedSection>
        <BecomeDeliveryBoy />
      </AnimatedSection>
      <AnimatedSection>
        <OurTeam />
      </AnimatedSection>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
   
    </>
  );
};

export default Home;
