
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/navbar";
import StatisticsSection from "../components/StatisticsSection";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <div>
     <Navbar/>
     <HeroSection/>
     <StatisticsSection/>
     <HowItWorks/>
 
     <Testimonials/>
     <Footer/>
    </div>
  );
}