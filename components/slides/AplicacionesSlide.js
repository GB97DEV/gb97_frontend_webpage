import Image from "next/image";
import { Row, Col } from "reactstrap";
import { motion } from 'framer-motion';
const AplicacionesSlide = ({active}) => {
  
 return(
  <div className={`slide-container`}>
    <div className="slide-image-contianer">
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.6}}
      >
        <Image 
          src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/fondo-aplicaciones/Programador.jpg"}
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
        <Row className="row-content total-height">
            <Col xl="6" lg="6" md="6" sm="12" xs="12" className="col-title">
              <h1 className="title text-center">Aplicaciones Textiles</h1>
              <p className="subtitle text-justify">Optimiza tu negocio textil con nuestras aplicaciones: toma pedidos, genera reportes y realiza seguimiento de manera eficiente y sencilla.</p>
                <a href="#Features" className="button-content">
                  Aplicaciones
                </a>
            </Col>
        </Row>
        </motion.div>
      </div>
  </div>
 ) 
}

export default AplicacionesSlide;