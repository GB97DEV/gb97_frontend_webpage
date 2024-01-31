import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import { BeneficiosApp } from "../../interface/BeneficiosApp"

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
                    Nuestra aplicación de producción textil es una solución que integra en una sola base de datos todos los procesos y subprocesos textiles, facilitando la gestión de la producción diaria, integrando todas las áreas de trabajo para tener todo el control de la producción planificada.
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
      <div className="mt-5">
        <Container>
          <h2 className="title font-bold text-center mb-5">Beneficios</h2>
          <Row className="mb-5">
            {
              BeneficiosApp["Produccion"].map((beneficio, i) => {
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
    </div>
  )
}

export default Produccion;