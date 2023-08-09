import React from 'react'
import { Row, 
    Col, 
    Container, 
    Card, 
    CardBody,
} from "reactstrap";
import Image from "next/image";
import about from "../../assets/images/about/about.png";
import MoreButton from '../basic/MoreButton';


const AboutUs = () => {
    return (
        <div className="spacer ">
            <Container className="feature30">
                <Row>
                    <Col lg="8" md="12">
                    <Image
                        src={about}
                        className="rounded img-responsive"
                        alt="Socializacion"
                    />
                    </Col>
                    <Col lg="5" md='9' className="text-center wrap-feature30-box">
                    <Card className="card-shadow">
                        <CardBody>
                        <div className="p-20">
                            <h3 className="title">
                            ¿Quienes Somos?
                            </h3>
                            <span >
                            GB97 ECUADOR CÍA. LTDA., se constituyó el 22 de noviembre de 2019. 
                            Somos una compañía subsidiaria de la Multinacional GB97 que se encuentra establecida en el Reino Unido desde 2016 y que tiene como objetivo principal la sistematización y optimización de los procesos productivos.
                            </span>
                            <MoreButton file='gb97.pdf' />
                        </div>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutUs