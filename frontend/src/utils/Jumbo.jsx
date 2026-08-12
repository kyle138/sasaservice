import { Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Logo from '../assets/SasaService_logo_tri_DS_sub_alpha.svg';

const Jumbo = () => {
  return (
    <Row className='pt-4 pb-2'>
      <OverlayTrigger
        delay={{ show: 138, hide: 400 }}
        overlay={<Tooltip id="LogoTip">'S' as a Service, redefining Saas!</Tooltip>}
      >
        <Image
          id="logo"
          src={Logo}
          alt="'S' as a Service, redefining Saas!"
        />
      </OverlayTrigger>
    </Row>
  );
};  // End Jumbo

export default Jumbo;