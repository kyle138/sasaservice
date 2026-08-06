import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Brand from './assets/SaaS_logo_DS_sub_alpha.svg';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <Navbar id="navbar" expand="md" className="pb-0">
        <Navbar.Brand href="/">
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
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item className='mx-3'>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item className='mx-3'>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
