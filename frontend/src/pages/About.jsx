import React from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Logo from '../assets/SasaService_logo_DS.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function About() {
  return (
    <Container className='vt323-regular crt mb-5'>
      <Row className='pt-4 pb-2'>
        <OverlayTrigger
          delay={{ show: 138, hide: 400 }}
          overlay={<Tooltip id="LogoTip">'S' as a Service, redefining Saas!</Tooltip>}
        >
          <Image
            id="logo"
            src={Logo}
            alt="'S' as a Service, redefining Saas!"
          />
        </OverlayTrigger>
      </Row>
      <Row className='py-2 ps-5 text-center'>
        <h1>About</h1>
        <p>Make look pretty later...</p>
      </Row>
    </Container>
  )
};

export default About;
