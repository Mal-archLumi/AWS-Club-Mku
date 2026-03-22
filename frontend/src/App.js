import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Team from './components/Team/Team';
import Events from './components/Events/Events';
import Apply from './components/Apply/Apply';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Team />
      <Events />
      <Apply />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
