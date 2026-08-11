import React, { useState, useEffect } from 'react';
import { Toast, Button, Container } from 'react-bootstrap';
import ReactGA from 'react-ga4';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setShow(true); // Show banner if no choice saved
    } else if (consent === 'granted') {
      updateConsent('granted');
    }
  }, []);

  const updateConsent = (status) => {
    ReactGA.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted');
    updateConsent('granted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'denied');
    updateConsent('denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      className="position-fixed bottom-0 start-0 end-0 p-3" 
      style={{ zIndex: 9999, pointerEvents: 'none' }}
    >
      <Container className="d-flex justify-content-center">
        <Toast 
          show={show} 
          className="bg-dark text-white p-2 shadow-lg w-100" 
          style={{ maxWidth: '600px', pointerEvents: 'auto' }}
        >
          <Toast.Body className="d-md-flex align-items-center justify-content-between consent">
            <div className="mb-3 mb-md-0 me-md-3">
              <strong className="d-block mb-1 bitcount">Obligatory Cookie Notice</strong>
              <small className="vt323-green vt323-regular">
                By continuing to use this site you agree to the use of cookies to identify your session.
              </small>
            </div>
            <div className="d-flex gap-2 shrink-0">
              <Button size="sm" className="consButton consButton-outline" onClick={handleDecline}>
                Decline
              </Button>
              <Button size="sm" className="consButton consButton-solid"  onClick={handleAccept}>
                Accept
              </Button>
            </div>
          </Toast.Body>
        </Toast>
      </Container>
    </div>
  );
}
