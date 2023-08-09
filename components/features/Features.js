import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Row, Col, Container, Card, CardBody, Button } from "reactstrap";
import MoreButton from '../basic/MoreButton';


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
                    <i className="fa fa-pencil-square-o ml-2"></i>
                  </div>
                  <h5 className="font-medium">GB97 Pedidos Textil</h5>
                  <p className="m-t-20">
                  GB97 Ecuador te ofrece una solución completa para gestionar tus pedidos, productos y clientes de manera rapida y eficiente. 
                  GB97 Pedidos Textil, registra productos y clientes, y genera ordenes y cotizaciones de forma rápida y sencilla con nuestra plataforma dedicada. 
                  Simplifica tu proceso de ventas.
                  </p>
                  <div className='mr-5'>
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
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                    <i className="fa fa-tasks"></i>
                  </div>
                  <h5 className="font-medium">GB97 Reportes Textil</h5>
                  <p className="m-t-20">
                    GB97 Ecuador ofrece un espacio de trabajo para su servicio tecnológico textil, 
                    accesible directamente desde tu dispositivo móvil. Además, 
                    proporcionamos un servicio completo de reportería que te permite visualizar de manera global o detallada el desempeño de tu negocio.
                  </p>
                  <MoreButton file='textil-workspace.pdf' />

                  <div className='mr-5'>
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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="m-t-40">
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round bg-light-info">
                  <Image
                    className='feature-logo'
                    src={require(`../../assets/images/logos/gb97-alianza_comun.webp`)}
                    alt={"logo track"}
                  />
                  </div>
                  <h5 className="font-medium">Alianza Común</h5>
                  <p className="m-t-20">
                    GB97 ofrece la plataforma integral para tus necesidades inmobiliarias y laborales. 
                    Ya sea que estés buscando publicar, comprar o alquilar bienes raíces u oferta laboral, Alianza Común es tu aliado confiable. 
                    Con una interfaz intuitiva y poderosas herramientas de búsqueda, nuestra aplicación te conecta con una amplia variedad de propiedades y oportunidades laborales.
                  </p>
                  <div className='mr-5'>
                    <a
                      className='btn btn-primary btn-md btn-arrow m-t-20'
                      data-toggle="collapse"
                      href='https://play.google.com/store/apps/details?id=com.gb97.smartandsafe.com.co' 
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                          Alianza Común
                          <i className="ti-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                <div className="icon-round bg-light-info">
                  <Image
                    className='feature-logo'
                    src={require(`../../assets/images/logos/gb97-track.png`)}
                    alt={"logo track"}
                  />
                </div>
                  <h5 className="font-medium">GB97 Track</h5>
                  <p className="m-t-20">
                    GB97 Ecuador cuenta con lo último en tecnologi en rastreo vehicular con los mas altos estandares de monitoreo y seguridad para su vehiculo,
                    contamos con Control de rutas y velocidad, Bloqueo de Encendido, Botón de panico para señales de emergencia, entre muchas mas funcionalidades que ayudar a que usted y su vehiculo esten seguros en las carretas del país.
                  </p>
                  
                  <MoreButton file='gb97-track.pdf' />
                  <div className='mr-5'>
                    <a
                      className='btn btn-primary btn-md btn-arrow m-t-20'
                      data-toggle="collapse"
                      href='https://play.google.com/store/apps/details?id=com.tracking.gb97' 
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                          GB97 Track
                          <i className="ti-arrow-right"></i>
                      </span>
                    </a>
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