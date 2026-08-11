import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Careers from './components/Careers';
import Policies from './components/Policies';
import Footer from './components/Footer';

function App() {
  /*
        / \__
       (    @\___
       /         O
      /   (_____/
     /_____/   U

     pawsfectwalks.com — good dogs, good walks.
  */
  return (
    <div className="min-h-screen">
      <Header />
      <About />
      <Services />
      <Careers />
      <Contact />
      <Policies />
      <Footer />
    </div>
  );
}

export default App;
