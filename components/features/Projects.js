import Image from "next/image";
import React, {useEffect} from "react";
import { Row, Col, Container} from "reactstrap";
import { ExperienceVideos } from "../../interface/ExperienceVideos";
import ProjectVideo from "../basic/ProjectVideo";

const Projects = () => {

  useEffect(() => {
    const videoElement = document.getElementById('video');

    // Reproducir el video automáticamente
    videoElement.play();

    // Configurar un bucle infinito
    videoElement.addEventListener('ended', () => {
      videoElement.play();
    });

    // Evitar que el usuario pause el video
    videoElement.addEventListener('click', (e) => {
      e.preventDefault();
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    });
  }, []);
  
  return (
    <>
      <div className="feature4  pt-4 pb-4">
        <Row className="justify-content-center ">
          <Col md="7" className="text-center">
            <h1 className="title">Nuestro Proyecto</h1>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col lg="6" md="12" sm="12" xs="12">
              <h3 className="title">
                Proyecto Textil Ecuadorable
              </h3>
              <p className="subtitle font-light text-justify mr-5">
                Nuestro proyecto, está enfocado en fomentar la inclusión tecnológica en el sector textil.
                <br/><br/>
                Buscamos mejorar la calidad de producción en nuestra comunidad, adoptando modelos cada vez más automatizados. 
                Estamos enfocados en la transformación tecnológica de las organizaciones textiles de la Economía Popular y Solidaria, para que tengan un acceso libre, sencillo y gratuito a desarrollos tecnológicos en nuestra plataforma.
                <br/><br/>
                Vemos que una de las barreras es el costo de las aplicaciones y contar con un acompañamiento personalizado; nuestro proyecto ayudará a bajar los índices de desiertos digitales que son frecuentes en comunidades desatendidas independientemente de en qué parte del país se encuentren.  

              </p>
            </Col>
            <Col lg="6" md="12" sm="12" xs="12">
            <div className="banner-project-container mt-4">
              <video id="video" width={"100%"} height={400} className="project-banner" muted preload="metadata" autoPlay>
                <source src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/videos/Ecuadorable.mp4" type="video/mp4"/>
              </video>             
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="title">
                Exportación
              </h3>
              <div className="subtitle font-light text-justify">
                Como resultado de la inclusión tecnológica se podrá obtener, una cadena productiva eficiente e integrada en todas sus etapas, logrando la estandarización de prendas en altos volúmenes, fomentando una competencia leal entre las organizaciones textiles.
                <br/> <br/>
                Esta Transformación digital podría dar paso a la formación de una corporación Textil a nivel país que se beneficie en la compra de insumos y materiales con precios privilegiados permitiéndoles competir en el mercado e incursionar en nuevos nichos de mercado tanto nacional como internacional.
                <br/>
                Este camino no está muy lejos de ser realidad como es el caso de nuestros licenciantes:
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="wrap-feature-20">
            {
              ExperienceVideos.map(({key, title, video}) => {
                return(
                  <React.Fragment key={key}>
                    <ProjectVideo title={title} URL={video} />
                  </React.Fragment>
                )
              })
            }
          </Row>
        </Container>
      </div>
      
    </>
  )
}

export default Projects;