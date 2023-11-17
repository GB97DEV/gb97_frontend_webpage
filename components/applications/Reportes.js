import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import Banner from "../../assets/images/AppReporting.jpg"
import { Store } from "../basic/Store"
import { ContactForm } from '../basic/ContactForm'

const Reportes = () => {
  return (
    <div className="aplicaciones">
      <div className="image-container">
        <div className="bg-dif"/>
        <Image 
          src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Reportes.jpg"
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
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-reportes.png"}
                alt={"logo reportes"}
                width={100}
                height={100}
              />
              <h2 className="title font-bold mt-3">GB97 Reportes Textil</h2>
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
                    ¿Qué es GB97 Reportes Textil?
                  </h2>
                  <p className="m-t-40 m-b-30 text-justify">
                    GB97 Ecuador ofrece un espacio de trabajo para su servicio tecnológico textil, 
                    accesible directamente desde tu dispositivo móvil. Además, 
                    proporcionamos un servicio completo de reportería que te permite visualizar de manera global o detallada el desempeño de tu negocio.
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
      <Store url="https://play.google.com/store/apps/details?id=com.alexandertubon.gb97textil_workspace" />
      <section id="Demo">
        <ContactForm app="Reportes" />
      </section>
    </div>
  )
}

export default Reportes;