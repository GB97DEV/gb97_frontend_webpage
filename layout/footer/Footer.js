/* eslint-disable */
import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer4 b-t spacer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Nos econtramos en:</h5>
            <a href={'https://goo.gl/maps/z2Zj9y7vyKSVgRHz7'} target="_blank">
              Edificio Milicentro
              <br/>
              Direccion: Ave Diego de Almagro &, Quito 170517.
              <br/>
              Quito - Ecuador
            </a>
          </Col>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Telefono</h5>
            <p>
              <i className="icono-telefono fa fa-phone" /> 02-453-4732 <br />
              <i className="icono-telefono fa fa-phone" /> 02-226-4009
            </p>
          </Col>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Correo</h5>
            <p>
              Información:
              <Link href={"mailto:informacion@gb97.ec"}>
                <a className="link">  informacion@gb97.ec</a>
              </Link>
              <br />
              Call Center:
              <Link href={""}>
                <a className="link">  callcentre@gb97.ec</a>
              </Link>
            </p>
          </Col>
          <Col lg="3" md="6">
            <h5 className="m-b-20">Social</h5>
            <div className="round-social light">
              <Link href="https://www.facebook.com/GB97ECUADOR">
                <a className="link">
                  <i className="fa fa-facebook"></i>
                </a>
              </Link>
              <Link href="https://twitter.com/Gb97Ecuador">
                <a className="link">
                  <i className="fa fa-twitter"></i>
                </a>
              </Link>
              <Link href="https://www.youtube.com/channel/UCUIuV1s5Om8Q5LpEsCO8cUg">
                <a className="link">
                  <i className="fa fa-youtube-play"></i>
                </a>
              </Link>
              <Link href="https://www.instagram.com/gb97ecuador/">
                <a className="link">
                  <i className="fa fa-instagram"></i>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
        <div className="f4-bottom-bar">
          <Row>
            <Col md="12">
              <div className="d-flex font-14">
                <div className="m-t-10 m-b-10 copyright">
                  All Rights Reserved by GB97 ECUADOR
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default Footer;
