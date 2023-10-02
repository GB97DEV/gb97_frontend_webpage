import React, {useState} from 'react'
import { 
	Row, 
	Col, 
	Container, 
	Card, 
	CardBody,
	Modal,
	ModalBody,
} from "reactstrap";
import Image from "next/image";
import about from "../../assets/images/about/about.png";
import certificado from "../../assets/images/Certificado.png"

const AboutUs = () => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
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
                    <Col lg="5" md='9' className="wrap-feature30-box">
                    <Card className="card-shadow">
                        <CardBody>
                        <div className="p-10">
                           <h3 className="title text-center">
                           ¿Quienes Somos?
                           </h3>
                           <div className='subtitle text-justify'>
                                Es una empresa subsidiaria de GB97 limite, la cual es una empresa multinacional creada para abarcar el conocimiento y experiencia de desarrollo tecnológico desde 1997 en Londres, Reino Unido que cuenta con una certificación internacional ISO9001-210.
                                <br/>
                                GB97 Ecuador nos encontramos en operaciones desde noviembre del 2019, ofreciendo soluciones desarrolladas con tecnología de última generación. 
                              </div>
                              <div className='text-justify mt-2'>
																<button className='more-button' onClick={toggle}>
																	<span className='more-text'>
																		Certificación
																	</span>
																	<i className='more-icon fa fa-arrow-right'></i>
																</button>
																<Modal 
																	size='md'
																	isOpen={modal}
																	toggle={toggle}
																>
																	<ModalBody>
																		<Image 
																			src={certificado}
																		/>
																	</ModalBody>
																</Modal>
                            </div>
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