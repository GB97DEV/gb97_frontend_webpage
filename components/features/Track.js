import { Row, Col, Container } from 'reactstrap'

const Track = () => {
	
	
  	return (
		<div className="mt-5">
			<Container>
					<h1></h1>
					<Row className="d-flex justify-content-between">
						<Col className=''>
							<div className='vertical-line'/>
							<h6 className='title'>Número de Visitas</h6>
							<h1 className='subtitle'>650</h1>
						</Col>
						<Col className=''>
							<div className='vertical-line'/>
							<h6 className='title'>Páginas por Visita</h6>
							<h1 className='subtitle'>1.85</h1>
						</Col>
						<Col className=''>
							<div className='vertical-line'/>
							<h6 className='title'>Promedio de Visita</h6>
							<h1 className='subtitle'>00:01:40</h1>
						</Col>
					</Row>
			</Container>
		</div>
 	)
}

export default Track