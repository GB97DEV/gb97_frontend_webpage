import React from 'react'
import Link from 'next/link'
import { Row, Col, Container, Card, CardBody, Button } from "reactstrap";


const Features = () => {
  return (
    <div className="spacer feature4">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h2 className="title">Servicio Textil GB97 Ecuador</h2>
              <h6 className="subtitle">
                GB97 utiliza una plataforma tecnológica basada en la nube para ofrecer su servicio. 
                Actualmente, cuenta con dos aplicaciones móviles diseñadas para dispositivos Android, proporcionando una experiencia completa y fácil de usar.
              </h6>
            </Col>
          </Row>
          <Row className="m-t-40">
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-star"></i>
                  </div>
                  <h5 className="font-medium">Pedidos GB97</h5>
                  <p className="m-t-20">
                  GB97 Ecuador te ofrece una solución completa para gestionar tus pedidos, productos y clientes de manera rapida y eficiente. 
                  Pedidos GB97, registra productos y clientes, y genera ordenes y cotizaciones de forma rápida y sencilla con nuestra plataforma dedicada. 
                  Simplifica tu proceso de ventas.
                  </p>
                  <div className='d-flex justify-content-around mr-5'>
                    <a
                      className='btn btn-primary btn-md btn-arrow m-t-20'
                      data-toggle="collapse"
                      href='https://play.google.com/store/apps/details?id=com.alexandertubon.pedidosgb97' 
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                          Pedidos GB97
                          <i className="ti-arrow-right"></i>
                      </span>
                    </a>

                    <div
                      className='btn btn-primary btn-md btn-arrow m-t-20'
                      data-toggle="collapse"
                    >
                      <Link
                        href='/guide'
                        rel="noreferrer"
                        passHref
                      >
                        <span>
                            Video Guia
                            <i className="ti-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-bars"></i>
                  </div>
                  <h5 className="font-medium">GB97 Textil Workspace</h5>
                  <p className="m-t-20">
                    GB97 Ecuador ofrece un espacio de trabajo para su servicio tecnológico textil, 
                    accesible directamente desde tu dispositivo móvil. Además, 
                    proporcionamos un servicio completo de reportería que te permite visualizar de manera global o detallada el desempeño de tu negocio.
                  </p>
                  <div className='d-flex justify-content-around'>
                    <a
                      className='btn btn-primary btn-md btn-arrow m-t-20'
                      data-toggle="collapse"
                      href='https://play.google.com/store/apps/details?id=com.alexandertubon.gb97textil_workspace' 
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                          GB97 Textil Workspace
                          <i className="ti-arrow-right"></i>
                      </span>
                    </a>

                    <div
                      className='a btn btn-primary btn-md btn-arrow m-t-20'
                      data-toggle="collapse"
                    >
                      <Link 
                        href='/guide#Textil'
                        rel="noreferrer"
                        passHref
                      >
                        <span>
                            Video Guia
                            <i className="ti-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Features