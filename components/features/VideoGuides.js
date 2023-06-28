import { Row, Col, Container } from "reactstrap";
import ModalVideo from "../basic/ModalVideo";
import { Pedido } from "../../interface/PedidoVideos";
import { Textil } from "../../interface/TextilVideos";

const VideoGuides = () => {
  	return (
    	<div>
			<div>
				<Container>
					<div id="Pedido">
					<Row className="justify-content-center">
						<Col md="7" className="text-center">
							<h1 className="mt-5 mb-5 title">Videos de Capacitación</h1>
							<h2 className="subtitle">Aplicación de Pedidos</h2>
						</Col>
					</Row>
						<Row className="m-t-40">
						{Pedido.map((item) => {
							return(
								<Col md="4" key={item.key}>
									<ModalVideo 
										title={item.title}
										preview={item.preview}
										videoPath={item.path}
									/>
								</Col>
							)
							})
						}
						</Row>
					</div>
					<div id="Textil">
						<Row className="justify-content-center">
							<Col md="7" className="text-center">
							<h2 className="mt-5 mb-5 subtitle">
								Aplicación Textil Workspace
							</h2>
							</Col>
						</Row>

						<Row className="m-t-40">
							{Textil.map((item) => {
								return(
									<Col md="4" key={item.key}>
										<ModalVideo 
											title={item.title}
											preview={item.preview}
											videoPath={item.path}
										/>
									</Col>
								)
								})
							}
						</Row>
					</div>
				</Container>
      	</div>
    	</div>
  	)
}

export default VideoGuides