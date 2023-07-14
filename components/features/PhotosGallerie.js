import React, {useState} from 'react'
import Image from 'next/image'
import { Row, Col, Container, Modal, ModalHeader, ModalBody } from 'reactstrap'

import img1 from '../../assets/images/about/about.png'
import GalleryCard from '../basic/GalleryCard'
import { GalleryClients } from '../../interface/GalleryClients'

const PhotosGallerie = () => {
  return (
    <div>
      <Row className="justify-content-center pt-4 pb-4">
        <Col md="7" className="text-center">
          <h1 className="title">Explorando Nuestra Experiencia</h1>
        </Col>
      </Row>
      <Container >
        <Row >
            {
              GalleryClients.map(item => {
                return(
                  <Col lg='4' md='4' sm='6' xs='6' key={item.id}>
                    <GalleryCard  image={item.photo} title={item.title} />  
                  </Col>  
                )
              })
            }
        </Row>
      </Container>
    </div>
  )
}

export default PhotosGallerie