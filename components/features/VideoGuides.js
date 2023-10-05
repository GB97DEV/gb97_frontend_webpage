import React, { useContext, useEffect, useState } from "react";
import { Button, Row, Col, Container, Collapse } from "reactstrap";
import ModalVideo from "../basic/ModalVideo";
import { Pedido } from "../../interface/PedidoVideos";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from 'next/router';

const VideoGuides = () => {
	const router = useRouter();
	const { isLoggedIn } = useContext(AuthContext);
	const [shouldRedirect, setShouldRedirect] = useState(false);

	const [pedidosOpen, setPedidosOpen] = useState(false)
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

	const [moduleOpen, setModuleOpen] = useState(false);

  const toggleModulo = (moduleName = "") => {
		if(activeModule === moduleName){
			setModuleOpen(!moduleOpen);
			setActiveModule("");
		} else {
			setActiveModule(moduleName);
		}
  }

	const RenderVideo = (moduleVideos) => {
		return moduleVideos.map(video => (
			<Col md="4" key={video.key}>
				<ModalVideo 
					title={video.title}
					videoPath={video.path}
				/>
			</Col>
		));
	};
	
	return (
		<div>
			{
				isLoggedIn &&
				<div>
					<Row className="justify-content-center">
						<Col md="7" className="text-center">
							<h1 className="mt-5 mb-5 title">Videos de Capacitación</h1>
						</Col>
					</Row>
					<div className="videos-menu-container">
						{/* <Row>
							<Col lg="4" md="5" sm="4"> */}
								<button className={`video-menu-button ${pedidosOpen ?"active" :""}`} onClick={togglePedidosVideo}>
									<Row className="ml-2 mr-2">
										<h3 className="subtitle">
											GB97 Pedidos Textil
												{
												!pedidosOpen
												? <i className="subtitle fa fa-chevron-down" />
												: <i className="subtitle fa fa-chevron-up" />
											}
										</h3>
										
									</Row>
								</button>
								{
									pedidosOpen &&
									<Collapse isOpen={pedidosOpen} className="videos-submenu-container">
									{
										Pedido.map(moduleItem => {
											return (
												<React.Fragment key={moduleItem.module}>
													<button className={`video-submenu-button ${activeModule === moduleItem.module ?"active" :""}`} onClick={() => {toggleModulo(moduleItem.module), setVideos(moduleItem.videos)}}>
														<Row className="mr-2">
															<h3 className="subtitle">{moduleItem.module}</h3>
															{
																activeModule !== moduleItem.module
																? <i className="subtitle fa fa-chevron-left" />
																: <i className="subtitle fa fa-chevron-right" />
															}
														</Row>
													</button>
													<Collapse isOpen={activeModule === moduleItem.module}>
									<Row className="video">
										{RenderVideo(videos)}
									</Row>
								</Collapse>
												</React.Fragment>
											);
										})
									}
									
								</Collapse>
								}
								{
									pedidosOpen &&
									<div className="divisor"/>
								}
							{/* </Col>
							<Col> */}
								
							{/* </Col>
						</Row> */}
					</div>				
				</div>
			}
		</div>
	)
}

export default VideoGuides