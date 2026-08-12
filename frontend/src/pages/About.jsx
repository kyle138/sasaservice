import Container from 'react-bootstrap/Container';
import CoolS from '../assets/CoolS.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
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
  return (
    <Container className='vt323-regular crt mb-5'>
      <Jumbo />
      <Row className='py-5 px-5 mx-3'>
        <Col sm={3}>
          <h1 className='bitcount vt323-green fs-1'>About</h1>
        </Col>
        <Col sm={9}>
          <p>
            Welcome to <span className='vt323-glow vt323-bold'>'S' as a Service ('S'aaS)</span> which is the world’s premier, enterprise-grade cloud solution for mission-critical 'S' identification and verification. Built to scale across modern distributed architectures, our sub-millisecond RESTful API empowers <span className='vt323-glow'>S</span>oftware Engineers, <span className='vt323-glow'>S</span>ystems Architects, <span className='vt323-glow'>S</span>cholars, <span className='vt323-glow'>S</span>alami Makers, and <span className='vt323-glow'>S</span>ophists worldwide to fetch, validate, and disambiguate any letter 'S' variant across the Unicode spectrum. Stop guessing if that squigly character counts as an 'S' and let <span className='vt323-glow vt323-bold'>'S'aaS</span> handle the heavy lifting!
          </p>
        </Col>
      </Row>
      <Row className='py-2 px-5 mx-3 api-row'>
        <Col sm={3}>
          <h1 className='bitcount vt323-green fs-1'>API</h1>
        </Col>
        <Col sm={9}>
          <p><span className='vt323-glow vt323-bold'>'S' as a Service</span> is powered by a world-class RESTful API designed to deliver high-performance 'S' validation securely and effeciently over the World Wide Web! It accepts both GET and POST request methods for all of your 'S' validation needs.</p>
        </Col>
      </Row>
      <Row className='py-2 px-5 mx-3 api-row'>
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
      <Row className='py-2 px-5 mx-3 api-row'>
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
      <Row className='py-2 px-5 mx-3 api-row'>
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
      <Row className='py-2 px-5 mx-3 api-row'>
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
      <Row className='mt-5 text-center'>
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
      </Row>
      <Copyright/>
    </Container>
  ); // End return
};  // End About

export default About;
