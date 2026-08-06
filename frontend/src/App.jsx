import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Brand from './assets/SaaS_logo_DS_sub_alpha.svg';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

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
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
