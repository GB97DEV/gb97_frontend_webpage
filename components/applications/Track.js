import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import Fondo from "../../assets/images/Fondo.jpg"
import Banner from "../../assets/images/AppTrack.jpg"
import { Store } from "../basic/Store"
import { BeneficiosApp } from "../../interface/BeneficiosApp"
import { ContactForm } from '../basic/ContactForm'

const Track = () => {
  return (
    <div className="aplicaciones">
      <div className="image-container">
        <div className="bg-dif" />
        <Image 
          src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Track.jpg"
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
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-track.png"}
                alt={"logo track"}
                width={100}
                height={100}
              />
              <h2 className="title font-bold mt-3">GB97 Track</h2>
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
                    ¿Qué es GB97 Track?
                  </h2>
                  <p className="m-t-40 m-b-30 text-justify">
                    Nuestra Aplicación de Track, cuenta con la última tecnología en rastreo vehicular con los más altos estándares de monitoreo y seguridad vehicular.
                    Con nuestra aplicación usted va a tener el control total de su vehículo, evitando intentos de robo y manipulación de su vehículo, llamadas de emergencia, avisos de control de velocidad y salidas de rutas establecidas, bloqueo de motor y ubicación en tiempo real. 
                  </p>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                  <Image
                    src={Banner}
                    alt="We are Digital Agency"
                    className="img-fluid"
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
              BeneficiosApp["Track"].map((beneficio, i) => {
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
      <Store url="https://play.google.com/store/apps/details?id=com.tracking.gb97" />
      <section id="Demo">
        <ContactForm app="Track"/>
      </section>
    </div>
  )
}

export default Track;