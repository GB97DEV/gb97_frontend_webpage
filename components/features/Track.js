import { useCallback, useEffect, useState } from 'react'
import { Row, Col, Container, Card } from 'reactstrap'

const Track = () => {

  	return (
		<div className="track-container feature4">
				<Container className='pt-5'>
					<Row className='justify-content-center'>
						<Col md="3" sm="6" xs="5">
							<Card className='pl-3 bg-transparent'>
								<div className='vertical-line'/>
								<h6 className='title'>Número de Visitas</h6>
								<h2 className='subtitle'>650</h2>
							</Card>
						</Col>
						<Col md="3" sm="6" xs="5">
							<Card className='pl-3 bg-transparent'>
								<div className='vertical-line'/>
								<h6 className='title'>Páginas por Visita</h6>
								<h2 className='subtitle'>1.85</h2>
							</Card>
						</Col>
						<Col md="3" sm="6" xs="6">
							<Card className='pl-3 bg-transparent'>
								<div className='vertical-line'/>
								<h6 className='title'>Promedio de Visita</h6>
								<h2 className='subtitle'>00:01:40</h2>
							</Card>
						</Col>
					</Row>
				</Container>
		</div>
 	)
}

export default Track