import React, { useContext, useEffect, useState } from "react";
import { Button, Row, Col, Container, Collapse, ListGroup, ListGroupItem } from "reactstrap";
import ModalVideo from "../basic/ModalVideo";
import { Pedido } from "../../interface/PedidoVideos";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from 'next/router';
import UpButton from "../basic/UpButton";

const VideoGuides = () => {
	const router = useRouter();
	const { isLoggedIn } = useContext(AuthContext);
	const [shouldRedirect, setShouldRedirect] = useState(false);

	const [pedidosOpen, setPedidosOpen] = useState(false)
	const [indiceOpen, setIndiceOpen] = useState(true)
	const [activeModule, setActiveModule] = useState("")
	const [videos, setVideos] = useState([])


  useEffect(() => {
    if (!isLoggedIn) {
      const timeout = setTimeout(() => {
        setShouldRedirect(true);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/acceso');
    }
  }, [shouldRedirect, router]);

	const togglePedidosVideo = () => {
		setPedidosOpen(!pedidosOpen)
	}

	const toggleIndice = () => {
		setIndiceOpen(!indiceOpen);
	}

	const [moduleOpen, setModuleOpen] = useState(false);

  const toggleModulo = (moduleName = "") => {
		if(activeModule === moduleName){
			setModuleOpen(!moduleOpen);
			setActiveModule("");
		} else {
			setActiveModule(moduleName);
		}
  }
	
	return (
		<div className="bg-light pb-3">
			{
				isLoggedIn &&
				<div>
					<Row className="justify-content-center">
						<Col md="7" className="text-center">
							<h1 className="mt-5 mb-5 title">Videos de Capacitación</h1>
						</Col>
					</Row>
					
					<div className="indice-container">
						<Col className="border bg-white" xl="7" lg="7" md="8" sm="12" xs="12">
							<Row className="mt-1 mb-1">
								<Col xs={10}>
									<h4 className="text-left mt-2">Índice de Contenido</h4>
								</Col>
								<Col xs={2} className="text-right mt-2">
									<button style={{border: "none", backgroundColor: "transparent"}} onClick={toggleIndice}>
										{!indiceOpen ? <i className="subtitle fa fa-chevron-down" /> : <i className="subtitle fa fa-chevron-up" />}
									</button>
								</Col>
							</Row>
							<Collapse isOpen={indiceOpen}>
								<div>
									{Pedido.map((modulo, index) => (
										<div key={modulo.module} className="mb-2">
											<p className="text-black">
												{`${index + 1}.`}
												<a className="ml-2" href={`#modulo-${modulo.module}`}>
													{`${modulo.module}`}
												</a>
											</p>
											{modulo.videos.map((video, videoIndex) => (
												<div className="ml-3 mt-2" key={videoIndex}>
													<p>
														{`${index + 1}.${videoIndex + 1}`}
														<a className="ml-2" href={`#video-${video.title}`}>
															{`${video.title}`}
														</a>
													</p>
													
												</div>
											))}
										</div>
									))}
									{/* <div key="FAQ" className="mb-2">
										<p className="text-black">
											<a className="ml-1" href={`#FAQ`}>
												Preguntas frecuentes - FAQ
											</a>
										</p>
									</div> */}
								</div>
							</Collapse>
						</Col>
					</div>

					<div className="videos-container">
						<h2 className="title-content title text-center">GB97 Pedidos Textil</h2>
						<div>
							{Pedido.map((modulo, index) => (
								<section id={`modulo-${modulo.module}`} className="mb-2" key={index}>
									<h4 className="title">
										{`${index + 1}.`} {`${modulo.module}`}
									</h4>
									<Row>
										{modulo.videos.map((video, videoIndex) => (
											<Col id={`video-${video.title}`} md="4" lg="4" sm="6" xs="12" key={video.key}>
												<Container>
													<ModalVideo 
														title={`${index + 1}.${videoIndex + 1} ${video.title}`}
														videoPath={video.path}
													/>
												</Container>
											</Col>													
										))}
									</Row>
								</section>
							))}
						</div>
					</div>
					{/* <div id="FAQ">
						<h2 className="title text-center mb-0">Preguntas Frecuentes</h2>
					</div> */}
					<UpButton />
				</div>
			}
		</div>
	)
}

export default VideoGuides