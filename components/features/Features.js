import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Row, Col, Container, Card, CardBody, Modal, ModalBody } from "reactstrap";
import MoreButton from '../basic/MoreButton';
import { BeneficiosApp } from '../../interface/BeneficiosApp';

const Features = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [module, setModule] = useState("")
  const toggle = (mod) => {
    if(mod){
      setModule(mod)
    }
    setIsOpen(!isOpen);
  }
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
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-pedidos.png"}
                    alt={"logo pedidos"}
                    width={100}
                    height={100}
                  />
                  </div>
                  <h5 className="font-medium">GB97 Pedidos Textil</h5>
                  <p className="m-t-20 text-justify">
                    GB97 Pedidos Textil es una aplicación móvil, que le permite gestionar de manera rápida y eficiente proformas, pedidos y facturas a sus clientes, con toda la información detallada y completa.
                    Nuestra Aplicación le permite tener una galería de fotos de sus prendas confeccionadas, con lista de precios por cliente, por talla y por prenda.
                    <br/>
                    También le permite ver el estado de sus pedidos ingresados, entregados en proceso o finalizados con un historial de pagos.
                    Puede llevar un registro adecuado de las entregas fecha, forma y firma, con foto de respaldo para su seguridad.  
                    <button className='mas-button pl-2' onClick={() => toggle("Pedidos")}>
                      Mas...
                    </button>
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
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-reportes.png"}
                    alt={"logo reportes"}
                    width={100}
                    height={100}
                  />
                  </div>
                  <h5 className="font-medium">GB97 Reportes Textil</h5>
                  <p className="m-t-20 text-justify">
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
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-alianza_comun.webp"}
                    alt={"logo track"}
                    width={100}
                    height={100}
                  />
                  </div>
                  <h5 className="font-medium">Alianza Común</h5>
                  <p className="m-t-20 text-justify">
                    Alianza Común es una aplicación web y móvil que apoya en la gestión del liderazgo y trabajo en equipo, con el objetivo de llevar a cabo una mejor organización en sus proyectos laborales, permitiendo una comunicación más acertada y eficaz.
                    <br/>
                    Con nuestra aplicación se podrá categorizar los contactos en grupo o subgrupos de acuerdo a su necesidad.
                    También se podrá enviar de forma masiva mensajes, avisos, convocatorias a las categorías seleccionadas.
                    <button className='mas-button pl-2' onClick={() => toggle("Alianza")}>
                      Mas...
                    </button>
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
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-track.png"}
                    alt={"logo track"}
                    width={100}
                    height={100}
                  />
                </div>
                  <h5 className="font-medium">GB97 Track</h5>
                  <p className="m-t-20 text-justify">
                    Nuestra Aplicación Track, cuenta con la última tecnología en rastreo vehicular con los más altos estándares de monitoreo y seguridad vehicular.
                    <br/>
                    Con nuestra aplicación usted va a tener el control total de su vehículo, evitando intentos de robo y manipulación de su vehículo, llamadas de emergencia, avisos de control de velocidad y salidas de rutas establecidas, bloqueo de motor y ubicación en tiempo real. 
                    <button className='mas-button pl-2' onClick={() => toggle("Track")}>
                      Mas...
                    </button>
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
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-produccion-textil.png"}
                    alt={"logo produccion"}
                    width={100}
                    height={100}
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
      <Modal 
        isOpen={isOpen} 
        toggle={toggle} 
        size='md'
      >
        <ModalBody>
          <Container>
            <h1 className='title'>Beneficios</h1>
            </Container>
            {module && BeneficiosApp[module] && (
              <ul>
                {BeneficiosApp[module].map((item, index) => (
                  <li className='text-justify mr-4' key={index}>{item}</li>
                ))}
              </ul>
            )}
        </ModalBody>
      </Modal>
    </>
  )
}

export default Features