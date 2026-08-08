import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Logo from '../assets/SasaService_logo_tri_DS_sub_alpha.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
import { Button }from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Jumbo from '../utils/Jumbo';
import Copyright from '../utils/Copyright';

function Contact() {
  const [required, setRequired] = useState(false);
  const [evapsToggle, setEvapsToggle] = useState(false);

  // Build the div containing the array of envelope ascii art
  function divEnvelope() {
    const envelope = `
+---------------------------------+
| ⧵                             / |
|  ⧵                           /  |
|   ⧵                         /   |
|    ⧵       CONTACT US      /    |
|     ⧵                     /     |
|    / ⧵                   / ⧵    |
|   /   ⧵_________________/   ⧵   |
|  /                           ⧵  |
| /                             ⧵ |
+---------------------------------+
`;

    const arrayEnvelope = Array.from(envelope).map((char, idx) => {
      return (char === '+' || char === '-' || char === '|' || char === '/' || char === '⧵' || char === '_' || char === 'C' || char === 'O' || char === 'N' || char === 'T' || char === 'A' || char === 'U' || char === 'S'  ) 
        ? <span key={idx.toString()}>{char}</span> 
        : char;
    });

    return (
      <div className='ascii envelope' id='divEnvelope'>
        {arrayEnvelope}
      </div>
    );
  } // End DivEnvelope

  function evapEnvelope() { 
    const interval = setInterval(() => {
      const asciiSpans = document.querySelectorAll("div.envelope > span:not(.evaps)");
      if(asciiSpans.length > 0) {
        const evap = asciiSpans[Math.floor(Math.random() * asciiSpans.length)];
        evap.classList.add("evaps");
      } else {
        clearInterval(interval);
        setEvapsToggle(!evapsToggle);
      }
    }, 7);
  };  // end evapEnvelope

  // Handle change in Message field
  function handleMessage(e) {
    console.debug(`handleMessage:e:: ${e.target.value}`); // DEBUG
    setRequired(e.target.value.length > 0);
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    console.debug(`handleSubmit:e:: ${e.target.value}`); // DEBUG
    evapEnvelope();
    // alert("Thank you for your message! We will get back to you shortly.");
  }

  return (
    <Container className='vt323-regular crt mb-5'>
      <Jumbo />
      <Form className='p-5'>
        <Form.Group className='mb-3' controlId='formYourname'>
          <Form.Label htmlFor="yourname">Your Name</Form.Label>
          <Form.Control type="text" id="yourname" />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label htmlFor='email'>Email Address</Form.Label>
          <Form.Control type="email" id='email'/>
          <Form.Text className='vt323-green fs-6'>
            (We will never share your email.)
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formSubject'>
          <Form.Label htmlFor='subject'>Subject</Form.Label>
          <Form.Control type="text" id='subject'/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formScore'>
          <Form.Label htmlFor='score'>Score</Form.Label>
          <Form.Control type="text" id='score'/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='message'>
          <Form.Label htmlFor='message'>Your Message (required)</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            onChange={handleMessage}
          />
        </Form.Group>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="submit-button-tooltip">
              { !required 
                ? "The message field is required." 
                : "Send your message."
              }
            </Tooltip>
          }
        > 
          <span className="d-inline-block">
            <Button 
              type="submit" 
              className='formSubmit' 
              disabled={!required}
              onClick={handleSubmit}
            >Send</Button>
          </span>
        </OverlayTrigger>
      </Form>
      <Row className='py-2 ps-5 text-center'>
        <Col>
          {divEnvelope()}
        </Col>
      </Row>
      <Copyright/>
    </Container>
  ); // End return
};  // End Contact

export default Contact;
