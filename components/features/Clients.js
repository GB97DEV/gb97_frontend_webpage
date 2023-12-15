import React, { useRef, useState, useEffect } from 'react';
import { Col, Row, Container} from 'reactstrap';
import ClientCard from '../basic/ClientCard';


const Clients = () => {
	const scrollableRowRef1 = useRef(null);
	const scrollableRowRef2 = useRef(null);
	const scrollableRowRef3 = useRef(null);

	const [desplazamiento, setDesplazamiento] = useState(1130);
	const [primerArray, setPrimerArray] = useState([]);
	const [segundoArray, setSegundoArray] = useState([]);
	const [tercerArray, setTercerArray] = useState([]);

	const [clients, setClients] = useState([]);
  const [isFetchClients, setIsFetchClients] = useState(false)

	useEffect(() => {
		getClients();
	}, []);

	useEffect(() => {
    handleResize(); // Llamada inicial al cargar el componente

    const longitud = clients.length;
    const parte = Math.floor(longitud / 3);

    setPrimerArray(clients.slice(0, parte));
    setSegundoArray(clients.slice(parte, parte * 2));
    setTercerArray(clients.slice(parte * 2));

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
	}, [isFetchClients]);

	const getClients = async() => {
		await fetch(`https://w1sppy28xj.execute-api.us-east-1.amazonaws.com/prod/gb97/organizaciones/api?limit=0`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
				const resp = data.data;
				const dataFiltered = resp.filter(item => item.organization !== "0691776360001")
				dataFiltered.sort(compareByName);

        setClients(dataFiltered);
        setIsFetchClients(true);
      });
	}

	const compareByName = (a, b) => {
		if (a.organizationAlias < b.organizationAlias) return -1;
		if (a.organizationAlias > b.organizationAlias) return 1;
		return 0;
	};
 

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
				<Row className="wrap-feature-20 mb-0">
					<div className='scrollable-row' ref={scrollableRowRef1}>
						{
							primerArray && primerArray.map((client) => {
								return(
									<Col lg='2' md="4" sm="6" xs="6" key={client._id}>
										<ClientCard image={client.organization} name={client.organizationAlias} organizationId={client.organization} products={client.products} />
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
									<Col lg='2' md="4" sm="6" xs="6" key={client._id}>
										<ClientCard image={client.organization} name={client.organizationAlias} organizationId={client.organization} products={client.products} />
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
									<Col lg='2' md="4" sm="6" xs="6" key={client._id}>
										<ClientCard image={client.organization} name={client.organizationAlias} organizationId={client.organization} products={client.products} />
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