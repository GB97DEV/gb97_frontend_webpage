import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import Banner from "../../assets/images/AppProduction.jpg"

const Produccion = () => {
  return (
    <div className="aplicaciones">
      <div className="image-container">
        <div className="bg-dif" />
        <Image 
          src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Textil.jpg"
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
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-produccion-textil.png"}
                alt={"logo reportes"}
                width={100}
                height={100}
              />
              <h2 className="title font-bold mt-3">GB97 Producción Textil</h2>
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
                    ¿Qué es GB97 Producción Textil?
                  </h2>
                  <p className="m-t-40 m-b-30 text-justify">
                    GB97 Ecuador te presenta su nueva aplicación: GB97 Producción Textil. Simplifica la gestión de informacion de insumos y brinda un soporte al proceso de producción textil.
                  </p>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                <Image
                    src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/aplicaciones-mock/Textil.jpg"}
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
    </div>
  )
}

export default Produccion;