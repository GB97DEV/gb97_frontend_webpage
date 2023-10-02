import React from "react";
import { Container, Row, Col} from "reactstrap";
import Image from "next/image";

import iso from "../../assets/images/landingpage/iso.png";
import ImagesCarousel from "../basic/ImagesCarousel";
import BannerPublicity from "../banner/BannerPublicity"


const Banner2 = () => {
  return (
    <div className="static-slider-head banner2">
      <BannerPublicity />
      <Container>
        <Row className="d-flex">
          <Col xl="6" lg="6" md="12" sm='12' xs='12' className="align-self-center">
            {/* <div className="d-flex justify-content-center">
              <Image 
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/0691776360001.png"}
                width={200}
                height={200}
                alt="Logo"
              />
            </div> */}
            <h1 className="title">
              Misión
            </h1>
            <h4 className="subtitle font-light text-justify mr-5">
              Somos una empresa que ofrece soluciones tencológicas a compañías y/o emprendimientos de la industria textil. 
              En donde sistematizando los procesos de producción y calidad, las empresas desarrollen productos de calidad, los cuáles sean competitivos en el mercado nacional e internacional.
            </h4>
            <h1 className="title">
              Vision
            </h1>
            <h4 className="subtitle font-light text-justify mr-5">
              Ser una empresa líder en el desarrollo de soluciones tecnológicas textiles, adaptándonos a los estándares de calidad nacionales e internacionales para el manejo y desarrollo de procesos sistematizados de empresas y/o emprendimientos de la industria textil.
            </h4>
            <div className="image-iso d-flex mr-5 mb-5 pt-3">
              <Image src={iso} alt="Logo ISO" width={160} height={90}/>            
            </div>
          </Col>
          <Col xl="6" lg="6" md="12" sm='12' xs='12' className="align-self-center pb-5 mb-5">
            <ImagesCarousel />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;
