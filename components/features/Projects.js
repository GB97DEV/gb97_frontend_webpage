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
                Nuestro proyecto, fomenta la inclusión tecnológica en el sector textil de la economía popular y solidaria de nuestro País.
                <br/>
                Buscamos mejorar la calidad de producción en nuestra comunidad, adoptando modelos cada vez más automatizados. 
                <br/> <br/>
                Reducimos los índices de desiertos digitales que son frecuentes en comunidades desatendidas, facilitando herramientas tecnológicas amigables, gratuitas y modernas que impactan positivamente en sus organizaciones.
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
                Nuestro proyecto no solo incluye la tecnología en nuestras organizaciones textiles, sino también se permite sensibilizar sobre lo que el estándar representa.
                <br />
                <br/>
                Uno de los requisitos importantes para la exportación es la estandarización y este es el resultado de digitalizar los procesos textiles, ya que nos permite garantizar que la calidad de la producción sea la misma a pesar de los altos volúmenes de producción.
                <br />
                <br/>
                Nuestro proyecto también permite que las organizaciones aprovechen de mejores oportunidades en el mercado, ampliando sus horizontes comerciales a nuevos nichos de mercados internacionales que solo es posible teniendo una cadena productiva eficiente e integrada. 
                <br />
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