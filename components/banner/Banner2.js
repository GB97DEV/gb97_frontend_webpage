import React from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";

import iso from "../../assets/images/landingpage/iso.png";
import home from "../../assets/images/landingpage/home.png";


const Banner2 = () => {
  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row className="">
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">
              SOLUCIONES TECNOLÓGICAS
            </h1>
            <h4 className="subtitle font-light text-justify mr-5">
              En GB97 Ecuador nuestra prioridad es que nuestros productos cumplan con estándares de calidad y que se adapten a sus necesidades. Contamos con una certificación ISO 9001.
            </h4>
            <div  className="d-flex justify-content-end mr-5 pt-3">
              <Image src={iso} alt="Logo ISO" width={260} height={120}/>            
            </div>
          </Col>
          <Col lg="6" md="6">
            <Image className="image-home" src={home} alt="Banner Inicio" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;
