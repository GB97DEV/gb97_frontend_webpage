import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Row, Col, Container, Card, CardBody, Button } from "reactstrap";
import MoreButton from '../basic/MoreButton';


const Features = () => {
  return (
    <>
      <div className=''>
        <Row className="justify-content-center ">
          <Col md="7" className="text-center">
            <h2 className="title">Aplicaciones GB97 Ecuador</h2>
            <h6 className="subtitle">
              GB97 utiliza una plataforma tecnológica basada en la nube para ofrecer su servicio. 
              Actualmente, cuenta con varias aplicaciones móviles multiplataforma, que brindan una experiencia completa y fácil de usar.
            </h6>
          </Col>
        </Row>
      </div>
      <div className="feature4">
        <Container>
          <Row className="m-t-40">
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                <div className="icon-round">
                  <Image
                    className='feature-logo'
                    src={require(`../../assets/images/logos/gb97-pedidos.png`)}
                    alt={"logo pedidos"}
                  />
                  </div>
                  <h5 className="font-medium">GB97 Pedidos Textil</h5>
                  <p className="m-t-20">
                    GB97 Ecuador te ofrece una solución que te permite gestionar de manera rápida y eficiente la información de tus productos, 
                    clientes y pedidos, simplificando así tu proceso de ventas. Te presentamos nuestra aplicación: GB97 Pedidos Textil.
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
                <div className="icon-round">
                  <Image
                    className='feature-logo'
                    src={require(`../../assets/images/logos/gb97-reportes.png`)}
                    alt={"logo reportes"}
                  />
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
                  <div className="icon-round">
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
                <div className="icon-round">
                  <Image
                    className='feature-logo'
                    src={require(`../../assets/images/logos/gb97-track.png`)}
                    alt={"logo track"}
                  />
                </div>
                  <h5 className="font-medium">GB97 Track</h5>
                  <p className="m-t-20">
                    GB97 Ecuador cuenta con lo último en tecnología en rastreo vehicular con los más altos estándares de monitoreo y seguridad para su vehículo, 
                    contamos con Control de rutas y velocidad, Bloqueo de Encendido, Botón de pánico para señales de emergencia, entre muchas más funcionalidades 
                    que ayudaran a que usted y su vehículo estén seguros en las carretas del país.
                  </p>
                  <div className="round-social">
                    <Link href="https://www.instagram.com/gb97tracking/">
                      <a className="link">
                        <i className="fa fa-instagram fa-2x"></i>
                      </a>
                    </Link>
                  </div>
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
          <Row className="m-t-40">
            <Col md="6" className="wrap-feature4-box">
              <Card>
                <CardBody>
                  <div className="icon-round">
                  <Image
                    className='feature-logo'
                    src={require(`../../assets/images/logos/gb97-produccion-textil.png`)}
                    alt={"logo track"}
                  />
                  </div>
                  <h5 className="font-medium">GB97 Producción Textil</h5>
                  <p className="m-t-20">
                    GB97 Ecuador te presenta su nueva aplicación: GB97 Producción Textil. Simplifica la gestión de informacion de insumos y brinda un soporte al proceso de producción textil.
                  </p>
                  <div className='mr-5'>
                    {/* <a
                      className='btn btn-primary btn-md btn-arrow m-t-20'
                      data-toggle="collapse"
                      
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                          Producción Textil
                          <i className="ti-arrow-right"></i>
                      </span>
                    </a> */}
                    <span>
                      Proximamente
                    </span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Features