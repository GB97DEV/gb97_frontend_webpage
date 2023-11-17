import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import Fondo from "../../assets/images/Fondo.jpg"
import Banner from "../../assets/images/AppAlianza.jpg"
import { Store } from "../basic/Store"
import { BeneficiosApp } from "../../interface/BeneficiosApp"
import { ContactForm } from '../basic/ContactForm'

const Alianza = () => {
  return (
    <div className="aplicaciones">
      <div className="image-container">
        <div className="bg-dif" />
        <Image
          src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Alianza.jpg"
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
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-alianza_comun.webp"}
                alt={"logo reportes"}
                width={100}
                height={100}
              />
              <h2 className="title font-bold mt-3">Alianza Común</h2>
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
                    ¿Qué es Alianza Común?
                  </h2>
                  <p className="m-t-40 m-b-30 text-justify">
                  Alianza Común es una aplicación web y móvil que apoya en la gestión del liderazgo y trabajo en equipo, con el objetivo de llevar a cabo una mejor organización en sus proyectos laborales, permitiendo una comunicación más acertada y eficaz.
                  Con nuestra aplicación se podrá categorizar los contactos en grupo o subgrupos de acuerdo a su necesidad. También se podrá enviar de forma masiva mensajes, avisos, convocatorias a las categorías seleccionadas.
                  </p>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                <Image
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/aplicaciones-mock/Alianza.jpg"}
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
              BeneficiosApp["Alianza"].map((beneficio, i) => {
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
      <Store url="https://play.google.com/store/apps/details?id=com.gb97.smartandsafe.com.co"/>
      <section id="Demo">
        <ContactForm app="Alianza" />
      </section>
    </div>
  )
}

export default Alianza;