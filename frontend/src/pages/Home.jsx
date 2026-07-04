import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


function Home() {
    const [message, setMessage] = useState("Here's a free random 'S'!");
    const [response, setResponse] = useState(<p>Loading...</p>);
    const [letter, setLetter] = useState('');

    const API = 'https://sasaservice.com/v1/';

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
    setMessage("Here's a free random 'S'!");
    
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


  // Test if supplied letter is an 'S'
  function handleLetter(e) {
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
                  ? `Is ${e.target.value} an 'S'?`
                  : `${e.target.value} is an 'S'` 
               : `The letter '${e.target.value}' is NOT an 'S'`;

      setMessage(`You asked to check: ${e.target.value}`);
      setResponse(<p>Verdict: {resp.verdict.toString()}<br/>{isAn}<br/>Description: {resp?.description}.</p>);
    })
    .catch((err) => {
      console.error(`POST error: `,err);
      setResponse(<p>Failed to connect to backend.</p>);
    }); // End fetch

  } // End handleLetter

  return (
    <Container className='vt323-regular crt'>
      <Row className='py-2 text-center'>
        <Col>
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
      </Row>
      <Row>
        <Col>
          <h1 className='vt323-regular vt323-green'>{message}</h1>
        </Col>
      </Row>
      <Row>
        <Col>{response}</Col>
      </Row>
      <Row className='pt-5'>
        <Col>
          <h1 className='vt323-regular vt323-green'>Or enter your own letter to check:</h1>
        </Col>
      </Row>
      <Form.Group as={Row} id='letter-input-group'>
        <Form.Label column sm={3} className='text-start' htmlFor="letter-input">Letter to check: </Form.Label>
        <Col sm={3} className='invFormInput ps-0'>
          <Form.Control
            id="letter-input"
            type="text"
            maxLength={1}
            value={letter}
            onFocus={(event) => event.target.select()}
            onChange={handleLetter}
          />
        </Col>
      </Form.Group>
      <Row className='pt-5 pb-2'>
        <Col>
          <p className='text-end'>© 2026</p>
        </Col>
      </Row>
    </Container>
  ); // End return
};  // End home

export default Home;