import React, { useState } from 'react';
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
  const envelope = `
  +---------------------------------+
  | \                             / |
  |  \                           /  |
  |   \                         /   |
  |    \                       /    |
  |     \                     /     |
  |    / \                   / \    |
  |   /   \_________________/   \   |
  |  /                           \  |
  | /                             \ |
  +---------------------------------+
  `;

  const [required, setRequired] = useState(false);

  // Handle change in Message field
  function handleMessage(e) {
    console.debug(`handleMessage:e:: ${e.target.value}`); // DEBUG
    setRequired(e.target.value.length > 0);
  }

  return (
    <Container className='vt323-regular crt mb-5'>
      <Jumbo />
      <Row className='py-2 ps-5 text-center'>
        <h1>Contact</h1>
        <p>Make look pretty later...</p>
      </Row>
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

        <Button 
          type="submit" 
          className='formSubmit' 
          disabled={!required}
        >Send</Button>
      </Form>
      <Copyright/>
    </Container>
  ); // End return
};  // End Contact

export default Contact;
