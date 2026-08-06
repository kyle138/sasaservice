import React from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Logo from '../assets/SasaService_logo_tri_DS_sub_alpha.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Jumbo from '../utils/Jumbo';
import Copyright from '../utils/Copyright';

function Contact() {
  return (
    <Container className='vt323-regular crt mb-5'>
      <Jumbo />
      <Row className='py-2 ps-5 text-center'>
        <h1>Contact</h1>
        <p>Make look pretty later...</p>
      </Row>
      <Copyright/>
    </Container>
  )
};

export default Contact;
