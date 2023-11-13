import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Row, Col, Container, Card, CardBody, Modal, ModalBody } from "reactstrap";
import MoreButton from '../basic/MoreButton';
import { BeneficiosApp } from '../../interface/BeneficiosApp';
import { ApplicationCard } from '../basic/ApplicationCard';
import { Application } from '../../interface/Application';

const Features = () => {
  return (
    <>
      <div className='spacer'>
        <Row className="justify-content-center ">
          <Col md="7" className="text-center">
            <h2 className="title">Aplicaciones GB97 Ecuador</h2>
            <h6 className="subtitle mr-3 ml-3">
              GB97 utiliza una plataforma tecnológica basada en la nube para ofrecer su servicio. 
              Actualmente, cuenta con varias aplicaciones móviles multiplataforma, que brindan una experiencia completa y fácil de usar.
            </h6>
          </Col>
        </Row>
      </div>
      <div >
        <Container>
          <Row>
            {
              Application.map((app) => {
                return(
                  <Col lg="4" md="6" sm="12" xs="12" key={app.title}>
                    <ApplicationCard 
                      fondo={app.fondo}
                      logo={app.logo}
                      title={app.title}
                      content={app.content}
                      href={app.href}
                    />
                  </Col>
                )
              })
            }
          </Row>
          
        </Container>
      </div>
    </>
  )
}

export default Features