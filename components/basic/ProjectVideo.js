import Image from "next/image";
import React, { useState } from "react";
import {Row, Col, Card, CardBody, Modal, ModalBody } from "reactstrap"

const ProjectVideo = ({title, URL}) => {
  const [video, setVideo] = useState(false);

  const toggleVideo = () => {
    setVideo(!video)
  }
  return (
    <>
      {/* <Col lg="6">
        <Card className="bg-video">
          <Row>
            <Col md="8">
              <CardBody className="d-flex no-block" >
                
                  <h5 className="font-medium ">
                    {title}
                  </h5>
              </CardBody>
            </Col>
          </Row>
          <Row>
            <Col >
            <div className='video-container border-video' >
              <video controls preload="metadata">
                <source src={URL} type="video/mp4" />
              </video>
            </div>
            </Col>
          </Row>
        </Card>
      </Col> */}
      <Col lg="6">
        <Card>
          <Row>
            <Col md="8">
              <CardBody className="d-flex no-block">
                <div>
                  <h4 className="font-medium">
                    {title}
                  </h4>
                </div>
              </CardBody>
            </Col>
            <Col md="4" className="text-center">
              <button onClick={toggleVideo} href="#" className="btn-video text-white linking bg-info">
                Conoce mas <i className="ti-arrow-right"></i>
              </button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Modal
        size="lg"
        isOpen={video}
        toggle={toggleVideo}
      >
        <ModalBody>
        <div className='video-container border-video' >
              <video controls preload="metadata">
                <source src={URL} type="video/mp4" />
              </video>
            </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ProjectVideo;