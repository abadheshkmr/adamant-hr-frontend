import './App.css';
import { Routes , Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Footer from './components/FooterSection/FooterSection.jsx';
import MinimalFooter from './components/FooterSection/MinimalFooter.jsx';
import Service from './pages/Service/Service.jsx';
import Business from './pages/Business/Business.jsx';
import Careers from './pages/Careers/Careers.jsx';
import Apply from './pages/Apply/Apply.jsx';
import AboutUs from './pages/Service/AboutUs/AboutUs.jsx';

function App() {
  // Use environment variable for API URL, default to local backend
  // For production, set REACT_APP_API_URL in .env file
  const url = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const location = useLocation();
  
  // Check if we're on careers page (including apply page)
  const isCareersPage = location.pathname === '/careers' || 
                        location.pathname === '/careers/' ||
                        location.pathname.startsWith('/careers/apply/');
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home url={url} />} />
        <Route path='/aboutus' element = {<AboutUs />} />
        <Route path='/services' element = {<Service url={url} />} />
        <Route path='/business' element = {<Business url={url} />} />
        <Route path='/careers' element = {<Careers url = {url} />} />
        <Route path='/careers/apply/:id' element = {<Apply url={url} />} />
      </Routes>
      {/* Conditional Footer Rendering */}
      {isCareersPage ? (
        <MinimalFooter key="minimal-footer" />
      ) : (
        <Footer key="full-footer" />
      )}
    </div>
  );
}

export default App;
