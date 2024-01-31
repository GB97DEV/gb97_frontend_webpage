import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { Row, Col, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';
import ClientsProducts from "../../interface/ClientsProducts";

const ClientCard = ({image = 'default', name = 'No definido', organizationId = ""}) => {
   const [modal, setModal] = useState(false);
   const [imageError, setImageError] = useState(false);
   const [products, setProducts] = useState([]);
	
   const toggle = () => {
      if(products.length > 0){
         setModal(!modal);
      }
   };

   const handleImageError = () => {
      setImageError(true);
    };

   useEffect(() => {
      ClientsProducts.filter(item => {
         if(item.organizationId === organizationId){
            setProducts(item.products)
         }
         return [];
      });
   }, [])
   
   return (
      <div>
         <Card className='logo-card'>
            <CardBody className='client'>
               <Row className='d-flex justify-content-center'>
               {imageError ? (
                  <Image
                     className={`${products.length > 0 && "image-card"} rounded`}
                     src={`https://bucket-images-gb97.s3.amazonaws.com/upload/default.png`} // Cambia esto a la ruta correcta de tu imagen por defecto
                     onClick={toggle}
                     height={100}
                     width={150}
                     loading='lazy'
                     alt="logo"
                  />
                  ) : (
                  <Image
                     className={`${products.length > 0 && "image-card"} rounded`}
                     src={`https://bucket-images-gb97.s3.amazonaws.com/upload/${image}.png`}
                     onClick={toggle}
                     height={100}
                     width={150}
                     loading='lazy'
                     alt="logo"
                     onError={handleImageError} // Manejar el error de la imagen
                  />
               )}
               </Row>
               <Row className='d-flex justify-content-center'>
                  <div className='mr-0'>
                     <h5 className="font-medium text-wrap text-center">
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