import { useState } from "react";
import Image from "next/image";
import {Row, Col, Container, Modal, ModalBody} from "reactstrap"
import Banner from "../../assets/images/about/about.jpg";
import Certificado from "../../assets/images/Certificado.png";
import Iso from "../../assets/images/landingpage/iso-black.png";

export const Nosotros = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className="aplicaciones">
      <div className="image-container">
        <div className="bg-dif" />
        <Image
          src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Socializacion.jpg"
          layout='fill'
          objectFit="cover"
          objectPosition={"center"}
        />
      </div>
      <div className="container-title spacer">
        <Container>
          <Row className="mt-5">
            <Col lg="6" md="6" sm="12" xs="10">
              <h1 className="title font-bold mt-3">GB97 Ecuador</h1>
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
                    ¿Quienes somos?
                  </h2>
                  <p className="m-t-40 m-b-30 text-justify">
                    Somos una empresa subsidiaria de GB97 limite, empresa multinacional creada para abarcar el conocimiento y
                    experiencia de desarrollo tecnológico desde 1997 en Londres,
                    Reino Unido que cuenta con una certificación internacional
                    ISO9001-210.
                    <br />
                    GB97 Ecuador nos encontramos en operaciones desde noviembre
                    del 2019, ofreciendo soluciones desarrolladas con tecnología
                    de última generación.
                  <div className="text-justify mt-2">
                    <button className="more-button" onClick={toggle}>
                      <span className="more-text">Certificación</span>
                      <i className="more-icon fa fa-arrow-right"></i>
                    </button>
                    <Modal size="md" isOpen={modal} toggle={toggle}>
                      <ModalBody>
                        <Image src={Certificado} />
                      </ModalBody>
                    </Modal>
                  </div>
                  </p>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                  <Image
                    src={Banner}
                    alt="We are Digital Agency"
                    className="img-fluid"
                    width={1080}
                    height={777}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
      <div className="valores spacer feature4 bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md="7" className="text-center">
              <h2 className="title font-bold">Nuestros Valores</h2>
              <h6 className="subtitle pt-3">
              En GB97 ECUADOR, siempre buscamos cumplir con el compromiso social de ayuda a los emprendedores y/o empresas ecuatorianas.
              </h6>
            </Col>
          </Row>
          </Container>
        <Container>
          <Row>
            <Col lg="6">
              <h2 className="title font-semibold">Misión</h2>
              <p className="subtitle text-justify">
              Somos una empresa que ofrece soluciones tecnológicas a compañías y/o emprendimientos de la industria ecuatoriana. 
              En donde sistematizando los procesos de producción y calidad, las empresas desarrollen productos de calidad, los cuáles sean competitivos en el mercado nacional e internacional.
              </p>
            </Col>
            <Col>
            <h2 className="title font-semibold">Visión</h2>
            <p className="subtitle text-justify">Ser una empresa líder en el desarrollo de soluciones tecnológicas, adaptándonos a los estándares de calidad nacionales e internacionales para el manejo y desarrollo de procesos sistematizados de empresas y/o emprendimientos de la industria ecuatoriana.</p>
            </Col>
          </Row>
          <Row>
            <div className="image-iso d-flex mr-5 mb-5 pt-3">
              <Image src={Iso} alt="Logo ISO" width={160} height={90}/>            
            </div>
          </Row>
        </Container>
      </div>
    </div>
  )
}