import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import { Store } from "../basic/Store"
import { ContactForm } from '../basic/ContactForm'
import { BeneficiosApp } from "../../interface/BeneficiosApp"

const PVenta = () => {
  return (
    <div className="aplicaciones">
      <div className="image-container">
        <div className="bg-dif"/>
        <Image 
          src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Pventa.jpg"
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
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-pventa.png"}
                alt={"logo reportes"}
                width={100}
                height={100}
              />
              <h2 className="title font-bold mt-3">GB97 Punto de Venta</h2>
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
                    ¿Qué es GB97 Punto de Venta?
                  </h2>
                  <p className="m-t-40 m-b-30 text-justify">
                    Es una aplicación móvil, que le permite vender sus productos con facilidad, calidad y rapidez.
                  </p>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                <Image
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/aplicaciones-mock/Pventa.jpg"}
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
      <div className="mt-5">
        <Container>
          <h2 className="title font-bold text-center mb-5">Beneficios</h2>
          <Row className="mb-5">
            {
              BeneficiosApp["Reportes"].map((beneficio, i) => {
                return(
                  <Col lg="6" md="6" sm="12" xs="12" key={i}>
                    <Row>
                      <Col lg="12" md="12" xm="12" xs="12" className="list-ben">
                        <h5 className="ben-text subtitle text-justify"><i className="ben-icono fa fa-circle" /> {beneficio}</h5>
                      </Col>
                    </Row>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </div>
      {/* <Store url="https://play.google.com/store/apps/details?id=com.alexandertubon.gb97textil_workspace" /> */}
      {/* <section id="Demo">
        <ContactForm app="pventa" />
      </section> */}
    </div>
  )
};

export default PVenta;