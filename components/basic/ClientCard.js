import React from 'react'
import Image from 'next/image'
import { Row, Card, CardBody } from 'reactstrap'


const ClientCard = ({image = 'default', name = 'No definido'}) => {
   return (
      <Card className='logo-card'>
         <CardBody className='client'>
            <Row className='d-flex justify-content-center'>
               <Image
                  className="rounded"
                  src={require(`../../assets/images/clientlogos/${image}.png`)}
                  height="100"
                  width="150"
                  alt="img"
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
   )
}

export default ClientCard