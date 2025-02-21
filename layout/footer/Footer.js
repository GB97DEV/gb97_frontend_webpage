/* eslint-disable */
import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer4 spacer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Apartado Postal</h5>
            <p>
              Codigo Postal: 170518
            </p>
          </Col>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Telefono</h5>
            <p>
              <i className="icono-telefono fa fa-phone" /> 02-226-4009
            </p>
          </Col>
          <Col lg="3" md="6" className="m-b-30">
            <h5 className="m-b-20">Correo</h5>
            <p>
              Información:
              <Link href={"mailto:infor@gb97.com"}>
                <a className="link">  info@gb97.com</a>
              </Link>
              <br />
              Call Center: <br/>
              <Link href={"mailto:callcentre@gb97.com"}>
                <a className="link">callcentre@gb97.com</a>
              </Link>
            </p>
          </Col>
          <Col lg="3" md="6">
            <h5 className="m-b-20">Redes Sociales</h5>
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
              <Link href="https://youtu.be/22keL1FWf6U">
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
            <Row>
              <Col md='2'>
                <div className="round-social light mt-2">
                  <Link href="https://www.instagram.com/ecuadorable1/">
                    <a className="link">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </Link>
                </div>
              </Col>
              <Col>
              <div className="mt-3 ml-1">
                <span className="link">Ecuadorable</span>
              </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="f4-bottom-bar">
          <Row>
            <Col md="12">
              <div className="d-flex font-14">
                <div className="m-t-10 m-b-10 copyright">
                  <p>
                    All Rights Reserved by GB97 ECUADOR
                  </p>
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
