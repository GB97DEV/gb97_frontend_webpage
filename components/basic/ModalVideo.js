import React, { useEffect, useState } from 'react'
import Image from "next/image";

import { Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import previewDefault from '../../assets/images/previews/default.png'

const ModalVideo = ({videoPath = '', preview = 'Preview.png', alt = "video" ,title}) => {
	const [modal, setModal] = useState(false);
  	const toggle = () => setModal(!modal);

   return (
		<div>
			<Card className="card-shadow img-ho video-box">
				<Image
					className="image-card card-img-top"
					src={require(`../../assets/images/previews/${preview}`)}
					alt={alt}
					onClick={toggle}
				/>
				<CardBody className='card-bg'>
					<h5 className="font-medium m-b-0 card-title">
					{title}
					</h5>
				</CardBody>
			</Card>
			<Modal 
				size='lg'
				isOpen={modal}
				toggle={toggle}
			>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody>
					<div className='video-container'>
						<video controls preload="metadata">
							<source src={videoPath} type="video/mp4" />
						</video>
					</div>
				</ModalBody>
			</Modal>
		</div>
   )
}

export default ModalVideo