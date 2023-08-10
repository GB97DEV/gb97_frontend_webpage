import React, { useRef, useState, useEffect } from 'react'
import { Col, Row, Container} from 'reactstrap'
import ClientCard from '../basic/ClientCard'
import ClientsLogos from '../../interface/ClientLogos'


const Clients = () => {
	const scrollableRowRef1 = useRef(null);
	const scrollableRowRef2 = useRef(null);
	const scrollableRowRef3 = useRef(null);

	const [desplazamiento, setDesplazamiento] = useState(1130)
	const [primerArray, setPrimerArray] = useState([])
	const [segundoArray, setSegundoArray] = useState([])
	const [tercerArray, setTercerArray] = useState([])

	useEffect(() => {
    handleResize(); // Llamada inicial al cargar el componente

    const longitud = ClientsLogos.length;
    const parte = Math.floor(longitud / 3);

    setPrimerArray(ClientsLogos.slice(0, parte));
    setSegundoArray(ClientsLogos.slice(parte, parte * 2));
    setTercerArray(ClientsLogos.slice(parte * 2));

    // Agregar el último elemento de segundoArray a primerArray si la longitud es impar
    if (longitud % 2 !== 0 && primerArray.length > 0) {
        setPrimerArray((prevArray) => {
            const lastItem = segundoArray[segundoArray.length - 1];
            return [...prevArray, lastItem];
        });
    }

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, [primerArray.length, segundoArray]);

	const handleResize = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth >= 1000) {
			setDesplazamiento(1140);
		} else if(windowWidth >= 750 <=1000){
		setDesplazamiento(710)
		}else if (windowWidth < 750) {
			setDesplazamiento(250);
		}
	};

	const handleScrollLeft = () => {
		if (scrollableRowRef1.current) {
			scrollableRowRef1.current.scrollLeft -= desplazamiento; // Ajusta el valor de desplazamiento según tus necesidades
		}
		if (scrollableRowRef2.current) {
			scrollableRowRef2.current.scrollLeft -= desplazamiento; // Ajusta el valor de desplazamiento según tus necesidades
		}
		if (scrollableRowRef3.current) {
			scrollableRowRef3.current.scrollLeft -= desplazamiento; // Ajusta el valor de desplazamiento según tus necesidades
		}
	};

	const handleScrollRight = () => {
		if (scrollableRowRef1.current) {
			scrollableRowRef1.current.scrollLeft += desplazamiento; // Ajusta el valor de desplazamiento según tus necesidades
		}
		if (scrollableRowRef2.current) {
			scrollableRowRef2.current.scrollLeft += desplazamiento; // Ajusta el valor de desplazamiento según tus necesidades
		}
		if (scrollableRowRef3.current) {
			scrollableRowRef3.current.scrollLeft += desplazamiento; // Ajusta el valor de desplazamiento según tus necesidades
		}
	};

  	return (
		<div className="feature20 mt-4 mb-4">
			<Container>
				<Row className="justify-content-center">
				<Col md="7" className="text-center">
					<h2 className="title">Nuestros Clientes</h2>
				</Col>
				</Row>
				<Row className="wrap-feature-20 mb-0">
					<div className='scrollable-row' ref={scrollableRowRef1}>
						{
							primerArray && primerArray.map((client) => {
								return(
									<Col lg='3' md="4" sm="6" xs="6" key={client.name}>
										<ClientCard image={client.logo} name={client.name} organizationId={client.organizationId} products={client.products} />
									</Col>
								)
							})
						}
					</div>
				</Row>
				<Row className="wrap-feature-20 mt-0">
					<div className='scrollable-row' ref={scrollableRowRef2}>
						{
							segundoArray && segundoArray.map((client) => {
								return(
									<Col lg='3' md="4" sm="6" xs="6" key={client.name}>
										<ClientCard image={client.logo} name={client.name} organizationId={client.organizationId} products={client.products} />
									</Col>
								)
							})
						}
					</div>
				</Row>
				<Row className="wrap-feature-20 mt-0">
					<div className='scrollable-row' ref={scrollableRowRef3}>
						{
							tercerArray && tercerArray.map((client) => {
								return(
									<Col lg='3' md="4" sm="6" xs="6" key={client.name}>
										<ClientCard image={client.logo} name={client.name} organizationId={client.organizationId} products={client.products} />
									</Col>
								)
							})
						}
					</div>
				</Row>
				<Container className='buttons-container'>
					<button className='arrow-button' onClick={handleScrollLeft}>
						<i className='arrow-icon fa fa-arrow-left fa-lg'></i>
					</button>
					<button className='arrow-button' onClick={handleScrollRight}>
						<i className='arrow-icon fa fa-arrow-right fa-lg'></i>
					</button>
				</Container>
			</Container>
		</div>
  	)
}

export default Clients