import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { Form, FormGroup, FormLabel, FormControl, FormText, Alert } from 'react-bootstrap';
import { Button }from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Jumbo from '../utils/Jumbo';
import Copyright from '../utils/Copyright';

function Contact() {
  const [submit, setSubmit] = useState(false);
  const [evapsToggle, setEvapsToggle] = useState(false);
  const [response, setResponse] = useState(0);

  const initialValues = {
    formYourName: '',
    formEmail: '',
    formSubject: '',
    formScore: '',
    formMessage: ''
  };
  const [formData, setFormData] = useState(initialValues);

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

  function Response() {
    return (
      <Row className='py-2 px-5 text-center'>
        <Col>
          {
            response === 1
            ? <Alert variant='success'>Thank you for your message!</Alert>
            : response === 2
              ? <Alert className='vt323-red ' variant='danger'>There was an error sending your message. Please try again later.</Alert>
              : response === 3
                ? <p>Hailing frequencies open...</p>
                : null
          }
        </Col>
      </Row>
    ); // End return
  }

  function Panel() {
    return (
      <Row className='py-2 px-5 text-center'>
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
    // console.debug(`handleMessage:e:: ${e.target.value}`); // DEBUG
    setFormData({...formData, formMessage: e.target.value});
    setSubmit(e.target.value.length > 0);
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(false);

    if(e.currentTarget.elements.formMessage?.value && e.currentTarget.elements.formMessage.value.length > 0) {
      var postData = {
        site: "sasaservice",
        name: formData.formYourName,
        email: formData.formEmail,
        subject: formData.formSubject,
        score: formData.formScore,
        message: formData.formMessage
      };

      evapEnvelope();
      setResponse(3);

      fetch('https://sasaservice.com/v1/feedback/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      })
      .then(async (resp) => {
        if(!resp.ok) {
          const errData = await resp.json().catch(() => ({}));
          throw new Error(errData.message || `Request failed with status ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        console.debug(`data: ${JSON.stringify(data,null,2)}`); // DEBUG
        const resp = data.response;

        setResponse(1);
        setFormData(initialValues);
      })
      .catch((err) => {
        console.error(`POST error: `,err);
        setResponse(2);
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
        <fieldset disabled={response > 0}>
          <Form.Group className='mb-3' controlId='formYourName'>
            <Form.Label>Your Name</Form.Label>
            <Form.Control 
              type="text" 
              className='fb-input'
              value={formData.formYourName}
              onChange={(e) => setFormData({...formData, formYourName: e.target.value})}
              />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              className='fb-input'
              value={formData.formEmail}
              onChange={(e) => setFormData({...formData, formEmail: e.target.value})}
              />
            <Form.Text className='vt323-green fs-6'>
              (We will never share your email.)
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formSubject'>
            <Form.Label>Subject</Form.Label>
            <Form.Control 
              type="text" 
              className='fb-input'
              value={formData.formSubject}
              onChange={(e) => setFormData({...formData, formSubject: e.target.value})}
              />
          </Form.Group>

          <Collapse>
            <Form.Group className='mb-3' controlId='formScore' >
              <Form.Label>Score</Form.Label>
              <Form.Control 
                type="text" 
                className='fb-input'
                value={formData.formScore}
                onChange={(e) => setFormData({...formData, formScore: e.target.value})}
                />
            </Form.Group>
          </Collapse>

          <Form.Group className='mb-3' controlId='formMessage'>
            <Form.Label>Your Message (required)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              className='fb-input'
              value={formData.formMessage}
              onChange={handleMessage}
              />
          </Form.Group>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="submit-button-tooltip">
                { 
                  response === 0
                  ? !submit 
                    ? "The message field is required." 
                    : "Send your message."
                  : "Your message has already been sent."
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
        </fieldset>
      </Form>
      <Panel />
      <Response />
      <Copyright/>
    </Container>
  ); // End return
};  // End Contact

export default Contact;
