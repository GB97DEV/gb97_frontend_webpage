import Image from "next/image";
import { Row, Col } from "reactstrap";
import { motion } from 'framer-motion';

export const TestimonioSlide = ({active}) => {
  return (
    <div className={`slide-container`}>
      <div className="slide-image-contianer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.6}}
        >
          <Image 
            src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Socializacion.jpg"}
            layout="fill"
          />
        </motion.div>
      </div>
      <div className="slide-content-container">
        <motion.div
          className="motion-div"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
        <Row className="row-content">
            <Col xl="6" lg="6" md="6" sm="12" xs="12" className="col-title">
              {/* <Image 
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-logo.png"}
                alt="gb97-logo"
                width={100}
                height={100}
              /> */}
              <h1 className="title">Testimonios de Colaboradores</h1>
              <p className="subtitle text-center">Descubre lo que nuestros colaboradores tienen que decir sobre nosotros y nuestras aplicaciones.</p>
            </Col>
            <Col xl="6" lg="6" md="6" sm="12" xs="12" className="col-video">
              <div className="icon-container">
                <a href="https://youtu.be/_8kNih-04N4" target="_blank" rel="noreferrer" className="icon fa fa-play-circle-o" />
              </div>
            </Col>
        </Row>
        </motion.div>
      </div>
    </div>
  )
}