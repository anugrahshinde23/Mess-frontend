
import Navbar from "../components/home-components/Navbar";
import Banner from "../components/home-components/Banner";
import OurServices from "../components/home-components/OurServices";
import HaveMess from "../components/home-components/HaveMess";
import BecomeDeliveryBoy from "../components/home-components/BecomeDeliveryBoy";
import OurTeam from "../components/home-components/OurTeam";
import Footer from "../components/home-components/Footer";
import AnimatedSection from "../utils/Animation";



const Home = () => {







  return (
    <>
     
     <AnimatedSection>
  <div id="navbar">
    <Navbar />
  </div>
</AnimatedSection>

<AnimatedSection>
  <div id="banner">
    <Banner />
  </div>
</AnimatedSection>

<AnimatedSection>
  <div id="services">
    <OurServices />
  </div>
</AnimatedSection>

<AnimatedSection>
  <div id="mess">
    <HaveMess />
  </div>
</AnimatedSection>

<AnimatedSection>
  <div id="delivery">
    <BecomeDeliveryBoy />
  </div>
</AnimatedSection>

<AnimatedSection>
  <div id="team">
    <OurTeam />
  </div>
</AnimatedSection>

<AnimatedSection>
  <div id="footer">
    <Footer />
  </div>
</AnimatedSection>
   
    </>
  );
};

export default Home;
