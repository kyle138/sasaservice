import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Brand from './assets/SaaS_logo_DS_sub_alpha.svg';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound404 from './pages/NotFound404';
import CookieConsent from './utils/CookieConsent';
import './App.css'
import SwipeWrapper from './utils/SwipeWrapper';

// Check if cookies consented
ReactGA.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

// Initialize GA4 with Measurement ID
if (window.location.hostname !== 'localhost') {
  ReactGA.initialize('G-EFS4PHD3ZX');
}

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const titles={
      '/': "'S' as a Service",
      '/about': "'S' as a Service - About",
      '/contact': "'S' as a Service - Contact"
    };

    // Catch-all
    document.title = titles[location.pathname] || "'S' as a Service - 404 Page Not Found";

    // Track GA4 title on route change
    ReactGA.send({hitType: 'pageview', page: location.pathname });
  }, [location]);

  return null;
} // End PageTitle

function NavBar() {
  const location = useLocation();

  return (
      <Navbar id="navbar" expand="md" className="pb-0 border-bottom" sticky="top">
        <Navbar.Brand as={Link} to="/">
          <Image 
            src={Brand}
            alt="'S'aaS"
            width="138"
            className='pb-0 ms-3'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='me-auto' variant="tabs" activeKey={location.pathname}>
            <Nav.Item className='mx-3'>
              <Nav.Link as={Link} eventKey="/" to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item className='mx-3'>
              <Nav.Link as={Link} eventKey="/about" to="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item className='mx-3'>
              <Nav.Link as={Link} eventKey="/contact" to="/contact">Contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );  // End return
};  // End NavBar

function App() {

  // GA4
  useEffect(() => {
    // Send pageview on load
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return (
    <BrowserRouter>
      <PageTitle />
      <NavBar />

      <SwipeWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound404 />} />
      </Routes>
      </SwipeWrapper>

    <CookieConsent />

    </BrowserRouter>
  );
}

export default App;
