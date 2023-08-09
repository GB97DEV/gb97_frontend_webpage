import React, {useState} from 'react';
import Image from 'next/image';
import { Row, Col, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';


const ClientCard = ({image = 'default', name = 'No definido', organizationId = "",products = []}) => {
   const [modal, setModal] = useState(false);
	const toggle = () => {
      if(products.length > 0){
         setModal(!modal);
      }
   };
   return (
      <div>
         <Card className='logo-card'>
            <CardBody className='client'>
               <Row className='d-flex justify-content-center'>
                  <Image
                     className={`${products.length > 0 && "image-card"} rounded`}
                     src={`https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/logos/${image}.png`}
                     onClick={toggle}
                     height={100}
                     width={150}
                     loading='lazy'
                     alt="logo"
                  />
               </Row>
               <Row className='d-flex justify-content-center'>
                  <div className='mr-0'>
                     <h5 className="font-medium text-wrap ">
                        {name}
                     </h5>
                  </div>
               </Row>
            </CardBody>
         </Card>
         <Modal 
					size='xl'
					isOpen={modal}
					toggle={toggle}
			>
					<ModalHeader toggle={toggle}>
						<p>{name}</p>
					</ModalHeader>
					<ModalBody>
                  <Row>
                     {
                        products.map((product, index) => {
                           return (
                              <Col md="4" key={index}>
                                 <Image
                                    src={`https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/productos/${organizationId}/${product}.png`}
                                    alt={"Producto"}
                                    onClick={toggle}
                                    loading='lazy'
                                    width={500}
                                    height={500}
                                 />
                              </Col>
                           )
                        })
                     }
                  </Row>
					</ModalBody>
			</Modal>
      </div>
   )
}

export default ClientCard