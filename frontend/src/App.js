import { useEffect } from 'react';
import SEO from './components/SEO';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Partners from "./components/Partners/Partners";
import Team from './components/Team/Team';
import Apply from './components/Apply/Apply';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';
import { SHOW_LEADERSHIP_APPLICATION } from './config';

//Introduce a toggle to show call for leadership application at the right moment 

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#') && target.pathname === window.location.pathname) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, null, target.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="App">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Partners />
        <Team />
        {/* Leadership applications are currently closed. */}
        {SHOW_LEADERSHIP_APPLICATION && <Apply />}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;