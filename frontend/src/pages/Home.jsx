import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Card } from 'react-bootstrap';
import Jumbo from '../utils/Jumbo';
import Copyright from '../utils/Copyright';


function Home() {
    const [interactive, setInteractive] = useState(false);
    const [response, setResponse] = useState(<p>Loading...</p>);
    const [letter, setLetter] = useState('');

    const API = 'https://sasaservice.com/api/';

    const rads = [
      {value: 'int', label: "Interactive Mode"},
      {value: 'rdm', label: "Random 'S'"}
    ];

  // ****************
  // Make API request
  useEffect(() => {
    fetch(API)
    .then((resp) => resp.json())
    .then((data) => {
      const resp = JSON.parse(data.response);
      console.debug(`Get response: ${JSON.stringify(data.response,null,2)}`); // DEBUG
      setLetter(resp.letter || '');
      setResponse(<p>Letter: {resp?.letter}<br/>Description: {resp?.description}</p>);
    })
    .catch((err) => {
      console.error(`GET error: `,err);
      setResponse(<p>Failed to connect to backend.</p>)}
    );
  }, []);

  // Reset the form when logo clicked
  function handleLogo() {
    setResponse(<p>Loading...</p>);
    setInteractive(false);
    
    fetch(API)
    .then((resp) => resp.json())
    .then((data) => {
      const resp = JSON.parse(data.response);
      setLetter(resp.letter || '');
      setResponse(<p>Letter: {resp?.letter}<br/>Description: {resp?.description}</p>);
    })
    .catch((err) => {
      console.error(`GET error: `,err);
      setResponse(<p>Failed to connect to backend.</p>);
    }); // End fetch
  } // End handleLogo

  // toggle between interactive mode
  function handleInteractive() {
    if(interactive) handleLogo();
    setInteractive(!interactive);
    console.log(`interactive: ${interactive}`); //DEBUG
  } // End handleInteractive

  // Test if supplied letter is an 'S'
  function handleLetter(e) {
    console.log(`handleLetter:e:: ${e.target.value}`); // DEBUG
    if (e.target.value.length != 1) {
      setLetter('');
      return;
    }

    setLetter(e.target.value);
    setResponse(<p>Checking letter {e.target.value}...</p>);

    fetch(API, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({letter: e.target.value, verbose: true})
    })
    .then((resp) => resp.json())
    .then((data) => {
      // console.debug(`data: ${JSON.stringify(data,null,2)}`); // DEBUG
      const resp = JSON.parse(data.response);
      console.debug(`Post response: ${JSON.stringify(resp,null,2)}`); // DEBUG

      // Set the "is an | is not an | etc... based on verdict"
      const isAn = resp?.verdict 
               ? resp?.verdict == "¯\\_(ツ)_/¯" 
                  ? `Eh... ${e.target.value} is maybe an 'S'.`
                  : `The letter ${e.target.value} is an 'S'!` 
               : `The letter '${e.target.value}' is NOT an 'S'.`;

      // Now set the response
      setResponse(
        <Card bg={'dark'} className='rounded-0 vt323-green'>
          <Card.Header>
            &gt;&nbsp;Response:
          </Card.Header>
          <Card.Body>
            <pre className='mx-1 mx-sm-3 vt323-regular responseCard'>
              Verdict: {resp.verdict.toString()}<br/>
              Description: {resp?.description}<br/>
              <br/>
              {isAn}
            </pre>
          </Card.Body>
        </Card>
      );
    })
    .catch((err) => {
      console.error(`POST error: `,err);
      setResponse(<p>Failed to connect to backend.</p>);
    }); // End fetch

  } // End handleLetter

  // Displays the random 'S' or Interactive field
  function Console() {
    if (interactive) {
      return (
        <>
          <Row className='pt-5 ps-5'>
            <Col>
              <h1 className='bitcount vt323-green fs-2'>Enter your own letter to check:</h1>
            </Col>
            <Form.Group as={Row} id='letter-input-group'>
              <Form.Label column sm={5} className='text-start fs-1' htmlFor="letter-input">Letter to check: </Form.Label>
              <Col sm={2} className='invFormInput ps-0'>
                <Form.Control
                  id="letter-input"
                  type="text"
                  size="lg"
                  className="bg-dark vt323-green crt-input fs-1"
                  maxLength={1}
                  value={letter}
                  onFocus={(event) => event.currentTarget.select()}
                  onClick={(event) => event.currentTarget.select()}
                  onChange={handleLetter}
                />
              </Col>
            </Form.Group>
          </Row>
          <Row className="px-5 mt-5">
            <Col>{response}</Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row className='pt-5 ps-5'>
            <Col>
              <h1 className='bitcount vt323-green fs-1'>Here's a free random 'S'!</h1>
            </Col>
          </Row>
          <Row className='ps-5'>
            <Col>{response}</Col>
          </Row>
        </>
      );
    }
  } // End random

  return (
    <Container className='vt323-regular crt mb-5'>
      <Jumbo />
      <Row className='py-2 ps-5 text-center'>
        <Col xs={4} md={6}>
          <OverlayTrigger
            delay={{ show: 138, hide: 400 }}
            overlay={<Tooltip id="CoolSTip">Click for a new random 'S'</Tooltip>}
          >
            <Image 
              src={CoolS} 
              alt="S" 
              onClick={handleLogo}
            />
          </OverlayTrigger>
        </Col>
        <Col xs={8} md={6}>
          <Row>
            <ToggleButtonGroup 
              vertical
              name="intrdm"
              type="radio"
              className="py-4 pe-5"
              value="interactive"
              onChange={handleInteractive}
              >
              {rads.map((rad, idx) => (
                <ToggleButton
                  key={`radv${idx}`}
                  id={`radv${idx}`}
                  size="lg"
                  className='text-start rounded-0 btn-secondary rad'
                  value="rad.value"
                  checked={true}
                  disabled={idx === (interactive ? 0 : 1)}
                  >
                  <h2 className='vt323-regular vt323-green'>
                    { (idx === (interactive ? 0 : 1) ? ">>\u00A0" : "\u00A0\u00A0\u00A0")+rad.label }
                  </h2>
                </ToggleButton>
              ))}  
            </ToggleButtonGroup>
          </Row>
        </Col>
      </Row>
      <Console />
      <Copyright />
    </Container>
  ); // End return
};  // End home

export default Home;
