import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import Fondo from "../../assets/images/Fondo.jpg"
import Banner from "../../assets/images/Pedidos.jpg"
import { Store } from "../basic/Store"
import { BeneficiosApp } from "../../interface/BeneficiosApp"
import { ContactForm } from '../basic/ContactForm'

const Pedidos = () => {
  return (
    <div className="aplicaciones">
      <div className="image-container">
      <div className="bg-dif"/>
        <Image
          src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Pedidos.jpg"
          layout='fill'
          objectFit="fill"
        />
      </div>
      <div className="container-title spacer">
        <Container>
          <Row className="mt-2">
            <Col lg="6" md="6" sm="12" xs="10">
              <Image
                className="app-logo text-center"
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-pedidos.png"}
                alt={"logo pedidos"}
                width={100}
                height={100}
              />
              <h2 className="title font-bold mt-3">GB97 Pedidos Textil</h2>
            </Col>
            
          </Row>
        </Container>
      </div>
      <div className="container-info">
        <section>
          <div id="banner1" className="banner spacer">
            <Container>
              <Row>
                <Col lg="6" md="7" className="align-self-center">
                  <h2 className="title font-bold text-center">
                    ¿Qué es GB97 Pedidos Textil?
                  </h2>
                  <p className="m-t-40 m-b-30 text-justify">
                    Es una aplicación móvil, que le permite gestionar de manera rápida y eficiente proformas, pedidos y facturas a sus clientes, con toda la información detallada y completa.
                    También le permite ver el estado de sus pedidos ingresados, entregados, en proceso o finalizados con un historial de pagos.
                  </p>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                  <Image
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/aplicaciones-mock/Pedidos.jpg"}
                    alt="We are Digital Agency"
                    className="img-fluid"
                    width={1200}
                    height={800}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
      <div className="spacer">
        <Container>
          <h2 className="title font-bold text-center mb-5">Beneficios</h2>
          <Row>
            {
              BeneficiosApp["Pedidos"].map((beneficio, i) => {
                return(
                  <Col lg="6" md="6" sm="6" xs="6" key={i}>
                    <Row>
                      <Col lg="1" md="1" sm="1" xs="1">
                        <i className="ben-icono fa fa-circle" />
                      </Col>
                      <Col lg="11" md="11" xm="11" xs="11">
                        <h5 className="ben-text subtitle text-justify">{beneficio}</h5>
                      </Col>
                    </Row>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </div>
      <Store url="https://play.google.com/store/apps/details?id=com.alexandertubon.pedidosgb97" />
      <section id="Demo">
        <ContactForm app="Pedidos" />
      </section>
    </div>
  )
}

export default Pedidos;