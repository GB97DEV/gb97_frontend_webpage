import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import TrackButton from "../../assets/images/botonTrackEncuesta.png"

export const TrackComponentForm = ({url}) => {
  return (
    <div className="spacer feature42 container-info bg-light">
      <Container>
        <Row className="justify-content-center wrap-feature49-box">
          <Col lg="7" md="10" className="text-center">
            <a
              className='m-b-20'
              data-toggle="collapse"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={TrackButton} alt="img" />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  )
}