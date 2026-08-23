import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Card } from 'react-bootstrap';
import Jumbo from '../utils/Jumbo';
import Copyright from '../utils/Copyright';

const respGet = {
  "letter": "S",
  "description": "Latin Capital Letter S"
};

const post = {
  "letter": "ṣ"
}

const respPost = {
  "verdict":true
};

const postVerbose = {
  "letter": "ŝ",
  "verbose": true
};

const respPostVerbose = {
  "verdict":true,
  "description": "Latin Small Letter S with circumflex"
};

const postAmbiguous = {
  "letter": "$",
  "verbose": true
};

const respPostAmbiguous = {
  "verdict": "¯⧵_(ツ)_/¯",
  "description": "Dollar Sign"
};

function About() {
  // Set API URL for call
  const API = 'https://sasaservice.com/api/';
  
  // Default values for Esses
  const [esses, setEsses] = useState(["S","Ś","Ŝ","Ş","Ṥ"]);

  // Make API request for 5 random Esses
  useEffect(() => {
    let callCount = 0;
    const MAX_CALLS = 20;

    const fetchEsses = () => {
      fetch(API+'?quantity=5')
      .then((resp) => resp.json())
      .then((data) => {
        setEsses(JSON.parse(data.response));
        // console.debug(`GET response: ${esses}`); // DEBUG
      })
      .catch((err) => {
        // API call failed, let default Esses stand.
        console.error(`GET error: `,err);
      });
    };  // End fetchEsses

    fetchEsses();
    callCount++;
    
    const intervalId = setInterval(() => {
      if (callCount < MAX_CALLS) {
        fetchEsses();
        callCount++;
      } else {
        clearInterval(intervalId);
      }
    }, 3000);

  }, []); // End useEffect

  // Set accordion state. 0=About, 1=API, 2=FAQ
  const [activeKey, setActiveKey] = useState(0);

  const rads = [ "About", "API", "FAQ" ];

  const handleMenu = (key) => {
    setActiveKey(prevKey => (prevKey === key ? null : key));
  } // End handleSection

  function Console() {
    switch (activeKey) {
      case 0:
        // About Section
        return (
          <Row 
            className='py-5 px-5 mx-3'
          >
            <Col sm={3}>
              <h1 className='bitcount vt323-green fs-1'>About</h1>
            </Col>
            <Col sm={9}>
                <p>
                  Welcome to <span className='vt323-glow vt323-bold'>'S' as a Service ('S'aaS)</span> which is the world’s premier, enterprise-grade cloud solution for mission-critical 'S' identification and verification. Built to scale across modern distributed architectures, our sub-millisecond RESTful API empowers <span className='vt323-glow'>{esses[0]}</span>oftware Engineers, <span className='vt323-glow'>{esses[1]}</span>ystems Architects, <span className='vt323-glow'>{esses[2]}</span>cholars, <span className='vt323-glow'>{esses[3]}</span>alami Makers, and <span className='vt323-glow'>{esses[4]}</span>ophists worldwide to fetch, validate, and disambiguate any letter 'S' variant across the Unicode spectrum. Stop guessing if that squigly character counts as an 'S' and let <span className='vt323-glow vt323-bold'>'S'aaS</span> handle the heavy lifting!
                </p>
            </Col>
          </Row>
        );
      case 1:
        // API Section
        return (
          <>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Col sm={3}>
                <h1 className='bitcount vt323-green fs-1'>API</h1>
              </Col>
              <Col sm={9}>
                <p><span className='vt323-glow vt323-bold'>'S' as a Service</span> is powered by a world-class RESTful API designed to deliver high-performance 'S' validation securely and effeciently over the World Wide Web! It accepts both GET and POST request methods for all of your 'S' validation needs.</p>
              </Col>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Col sm={3}>
                <h1 className='bitcount vt323-green fs-1'>
                  GET
                </h1>
                <h2 className='bitcount vt323-green'>Random 'S'</h2>
              </Col>
              <Col sm={9}>
                <p>A simple GET request returns a JSON object containing a random 'S' and its description.</p>
                <Card bg={'dark'} className="rounded-0 vt323-green">
                  <Card.Header>
                    &gt;&nbsp;GET /api/ HTTP/1.1<br/>
                    &gt;&nbsp;Host: sasaservice.com
                  </Card.Header>
                  <Card.Body>
                    &lt;&nbsp;Response:
                    <pre className='ms-3'>
                      <code className='rounded-0 vt323-regular api-code'>{JSON.stringify(respGet,null,2)}</code>
                    </pre>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Col sm={3}>
                <h1 className='bitcount vt323-green fs-1'>
                  POST
                </h1>
                <h2 className='bitcount vt323-green'>Simple mode</h2>
              </Col>
              <Col sm={9}>
                <p>If you already have your own 'S' or a character that you're not sure counts as an 'S' you can make a POST request to validate it. The 'S' as a Service API will return a verdict of true or false.</p>
                <Card bg={'dark'} className='rounded-0 vt323-green'>
                  <Card.Header>
                    &gt;&nbsp;POST /api/ HTTP/1.1<br/>
                    &gt;&nbsp;Host: sasaservice.com<br/>
                    &gt;&nbsp;Content-Type: application/json<br/>
                    &gt;&nbsp;Data: {JSON.stringify(post)}
                  </Card.Header>
                  <Card.Body>
                    &lt;&nbsp;Response:
                    <pre className='ms-3'>
                      <code className='rounded-0 vt323-regular api-code'>{JSON.stringify(respPost,null,2)}</code>
                    </pre>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Col sm={3}>
                <h1 className='bitcount vt323-green fs-1'>
                  POST
                </h1>
                <h2 className='bitcount vt323-green'>Verbose mode</h2>
              </Col>
              <Col sm={9}>
                <p>If you need more information about your character verbose mode will return a description of the provided 'S' along with a verdict of true or false.</p>
                <Card bg={'dark'} className='rounded-0 vt323-green'>
                  <Card.Header>
                    &gt;&nbsp;POST /api/ HTTP/1.1<br/>
                    &gt;&nbsp;Host: sasaservice.com<br/>
                    &gt;&nbsp;Content-Type: application/json<br/>
                    &gt;&nbsp;Data: {JSON.stringify(postVerbose)}
                  </Card.Header>
                  <Card.Body>
                    &lt;&nbsp;Response:
                    <pre className='ms-3'>
                      <code className='rounded-0 vt323-regular api-code'>{JSON.stringify(respPostVerbose,null,2)}</code>
                    </pre>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Col sm={3}>
                <h1 className='bitcount vt323-green fs-1'>
                  POST
                </h1>
                <h2 className='bitcount vt323-green'>Ambiguous Characters</h2>
              </Col>
              <Col sm={9}>
                <p>Not all 'S's are easily determined and some may fall in a grey zone. The <span className='vt323-glow vt323-bold'>'S' as a Service</span> API easily handles these ambiguous cases!</p>
                <Card bg={'dark'} className='rounded-0 vt323-green'>
                  <Card.Header>
                    &gt;&nbsp;POST /api/ HTTP/1.1<br/>
                    &gt;&nbsp;Host: sasaservice.com<br/>
                    &gt;&nbsp;Content-Type: application/json<br/>
                    &gt;&nbsp;Data: {JSON.stringify(postAmbiguous)}
                  </Card.Header>
                  <Card.Body>
                    &lt;&nbsp;Response:
                    <pre className='ms-3'>
                      <code className='rounded-0 vt323-regular api-code'>{JSON.stringify(respPostAmbiguous,null,2)}</code>
                    </pre>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )
      case 2:
        // FAQ Section
        return (
          <>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Col sm={3}>
                <h1 className='bitcount vt323-green fs-1'>FAQs</h1>
              </Col>
              <Col sm={9}>
                <p>Hey, you have questions and 'S' as a Service has your answers! 'S'aaS adheres to a strict policy of openness, transparency, and accountability. If you don't see your question listed below feel free to Contact us!</p>
              </Col>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Card bg={'dark'} className='rounded-0 vt323-green'>
                <Card.Header className='fs-3'>Why? I mean, just, why?</Card.Header>
                <Card.Body>I know, right?</Card.Body>
              </Card>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Card bg={'dark'} className='rounded-0 vt323-green'>
                <Card.Header className='fs-3'>I was trying to integrate this into our enterprise stack, but I need the API parameters.</Card.Header>
                <Card.Body>Please see our full API documentation by selecting the 'API' section from the menu above.</Card.Body>
              </Card>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Card bg={'dark'} className='rounded-0 vt323-green'>
                <Card.Header className='fs-3'>Is this a per call or a per "S" billing format?</Card.Header>
                <Card.Body>
                  We bill per API call, per 'S' returned, and charge a 15% egress fee for the whitespace surrounding the character. Capital 'S's are billed under our Standard Service plan however lowercase 'S's require an active developer license. Plus a nominal 'Predictive Character Surcharge' every time the backend functions think about an 'S'. Pretty standard stuff, it's all in our SLA.
                </Card.Body>
              </Card>
            </Row>
            <Row className='py-2 px-5 mx-3 api-row' >
              <Card bg={'dark'} className='rounded-0 vt323-green'>
                <Card.Header className='fs-3'>Do you offer any bulk discounts?</Card.Header>
                <Card.Body>
                  Make 3 easy API calls and we'll throw in the fourth one for free!!!
                </Card.Body>
              </Card>
            </Row>
            
          </>
        );
      default:
        break;
    }

  }

  return (
    <Container className='vt323-regular crt mb-5'>
      <Jumbo />
      {/* Toggle Menu */}
      <Row className='mt-5 text-center'>
        <Col xs={4} md={6}>
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
        </Col>
        <Col xs={8} md={6}>
          <Row>
            <ToggleButtonGroup
              vertical
              name="abtmenu"
              type="radio"
              className="py-4 pe-5"
              value="abtmenu"
              onChange={handleMenu}
            >
            {rads.map((rad,idx) => (
              <ToggleButton
                key={`radv${idx}`}
                id={`radv${idx}`}
                size="lg"
                className='text-start rounded-0 btn-secondary rad'
                value={idx}
                checked={true}
                disabled={idx === activeKey}
              >
                <h2 className='vt323-regular vt323-green'>
                  { (idx === activeKey ? ">>\u00A0" : "\u00A0\u00A0\u00A0")+rad }
                </h2>
              </ToggleButton>
            ))}
            </ToggleButtonGroup>
          </Row>
        </Col>
      </Row>
      <Console />      
      <Copyright/>
    </Container>
  ); // End return
};  // End About

export default About;
