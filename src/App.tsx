import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import NightOut from './components/NightOut';
import ServiceAreas from './components/ServiceAreas';
import Community from './components/Community';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Policies from './components/Policies';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Services />
      <About />
      <HowItWorks />
      <NightOut />
      <ServiceAreas />
      <Community />
      <Careers />
      <Contact />
      <Policies />
      <Footer />
    </div>
  );
}
