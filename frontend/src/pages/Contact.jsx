import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { Form, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
import { Button }from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Jumbo from '../utils/Jumbo';
import Copyright from '../utils/Copyright';

function Contact() {
  const [submit, setSubmit] = useState(false);
  const [evapsToggle, setEvapsToggle] = useState(false);

  // Build the div containing the array of envelope ascii art
  function divEnvelope() {
    const envelope = `
+-----------------------------+
| ⧵                         / |
|  ⧵                       /  |
|   ⧵                     /   |
|    ⧵     CONTACT US    /    |
|     ⧵                 /     |
|    / ⧵               / ⧵    |
|   /   ⧵_____________/   ⧵   |
|  /                       ⧵  |
| /                         ⧵ |
+-----------------------------+
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

  function divCoolS() {
    return (
      <OverlayTrigger
            delay={{ show: 138, hide: 400 }}
            overlay={<Tooltip id="CoolSTip">Click for a new random 'S'</Tooltip>}
          >
            <Link to="/">
              <Image 
                src={CoolS} 
                alt="S" 
              />
            </Link>
          </OverlayTrigger>
    ); // End return
  }; // End divCoolS

  function Panel() {
    return (
      <Row className='py-2 ps-5 text-center'>
        <Col>
          { evapsToggle ? divCoolS() : divEnvelope() }
        </Col>
      </Row>
    ); // End return
  }; // End Panel

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
    }, 1);
  };  // end evapEnvelope

  // Handle change in Message field
  function handleMessage(e) {
    console.debug(`handleMessage:e:: ${e.target.value}`); // DEBUG
    setSubmit(e.target.value.length > 0);
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(false);
    console.debug(`handleSubmit:e:: `,e.currentTarget.elements); // DEBUG
    console.debug(`formYourName: `,e.currentTarget.elements.formYourName); // DEBUG

    if(e.currentTarget.elements.formMessage?.value && e.currentTarget.elements.formMessage.value.length > 0) {
      var formData = {
        site: "sasaservice",
        name: e.currentTarget.elements.formYourName.value,
        email: e.currentTarget.elements.formEmail.value,
        subject: e.currentTarget.elements.formSubject.value,
        score: e.currentTarget.elements.formScore.value,
        message: e.currentTarget.elements.formMessage.value
      };

      evapEnvelope();

      fetch('https://sasaservice.com/v1/feedback/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.debug(`data: ${JSON.stringify(data,null,2)}`); // DEBUG
        const resp = JSON.parse(data.response);
        console.debug(`Post response: ${JSON.stringify(resp,null,2)}`); // DEBUG

        // SET RESPONSE HERE
      })
      .catch((err) => {
        console.error(`POST error: `,err);
        // SET RESPONSE HERE
      }); // End fetch

    } // End if message

  } // End handleSubmit

  return (
    <Container className='vt323-regular crt mb-5'>
      <Jumbo />
      <Row className='px-5 pt-5'>
        <Col>
          <p>We would love to hear from you! Please use the Feedback form below to send a message.</p>
        </Col>
      </Row>
      <Form className='p-5' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formYourName'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" />
          <Form.Text className='vt323-green fs-6'>
            (We will never share your email.)
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formSubject'>
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Collapse>
          <Form.Group className='mb-3' controlId='formScore' >
            <Form.Label>Score</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Collapse>

        <Form.Group className='mb-3' controlId='formMessage'>
          <Form.Label>Your Message (required)</Form.Label>
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
              { !submit 
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
              disabled={!submit}
            >Send</Button>
          </span>
        </OverlayTrigger>
      </Form>
      <Panel />
      <Copyright/>
    </Container>
  ); // End return
};  // End Contact

export default Contact;
