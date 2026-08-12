import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Jumbo from '../utils/Jumbo';
import Copyright from '../utils/Copyright';


// Main Function
const NotFound404 = () => {
  const [dropsToggle, setDropsToggle] = useState(false);

  //
  // Div404
  // Build the div containing the array of 404 ascii art
  function Div404() {
    const letters404 = `
    44    44   000000   44    44
    44    44  000   00  44    44
    44    44  0000  00  44    44
    44444444  00 00 00  44444444
          44  00  0000        44
          44  00   000        44
          44   000000         44
    `;

    const array404 = Array.from(letters404).map((char, idx) => {
      return (char === '4' || char === '0') ? <span key={idx.toString()}>{char}</span> : char;
    });
    
    return (
      <div className='ascii text-center' id='div404'>
        {array404}
      </div>
    );
  } // End Div404

  useEffect(() => {
    const interval = setInterval(() => {
      const asciiSpans = document.querySelectorAll("div.ascii > span:not(.drops)");
      if(asciiSpans.length > 0) {
        const drop = asciiSpans[Math.floor(Math.random() * asciiSpans.length)];
        drop.classList.add("drops");
      } else {
        clearInterval(interval);
        setDropsToggle(!dropsToggle);
      }
    }, 1380);
  }, [dropsToggle]); // End useEffect

  return (
    <Container>
      <Jumbo />
      <Container className='vt323-regular crt mb-3'>
        <Row className='pt-1'>
          <Col>
            <Div404 />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="bitcount vt323-green">404 : PAGE NOT FOUND</h1>
            <p>
              The page you have requested cannot be located, please refresh and try again.<br/>
              If you believe you have received this message in error, please hang up and contact your administrator.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>End of Line<span className='cursor'>_</span></p>
          </Col>
        </Row>
        <Copyright />
      </Container>
    </Container>
  );  // End return
} // End NotFound404

export default NotFound404;
