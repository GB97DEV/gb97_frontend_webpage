import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import Android from "../../assets/images/store/play-store.png"

export const Store = ({url}) => {
  return (
    <div className="spacer feature42 container-info bg-light">
      <Container>
        <Row className="justify-content-center wrap-feature49-box">
          <Col lg="7" md="10" className="text-center">
            <h2 className="title font-bold">
              Adquiere Nuestra Aplicación
            </h2>
            <h6 className="subtitle op-7 m-b-20">
              Prepárate para una experiencia única con nuestras aplicaciones. Transforma tu vida, descubre un mundo de posibilidades y hazlo tuyo. ¡Adquiérela y comienza tu aventura hoy!
            </h6>
            <a
              className='m-b-20'
              data-toggle="collapse"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={Android} alt="img" />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  )
}