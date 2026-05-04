import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import BuildCycles from './components/BuildCycles/BuildCycles';
import Projects from './components/Projects/Projects';
import Team from './components/Team/Team';
import Apply from './components/Apply/Apply';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

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
      <Navbar />
      <Hero />
      <About />
      <BuildCycles />
      <Projects />
      <Team />
      <Apply />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;