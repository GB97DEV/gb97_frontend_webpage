import React, {useState} from 'react'
import Image from 'next/image'
import { Card, Modal, ModalBody, ModalHeader } from 'reactstrap';

const GalleryCard = ({image= '', alt = 'imagen', title = ''}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
  return (
    <div>
			<Card className="card-shadow img-ho" inverse>
				<Image
						className="image-card card-img-top"
						src={require(`../../assets/images/gallery/${image}`)}
						alt={alt}
						onClick={toggle}
				/>

				<div className='title-container'>
					<div className='img-title'>
						<span>{title}</span>
					</div>
				</div>
			</Card>
			<Modal 
					size='lg'
					isOpen={modal}
					toggle={toggle}
			>
					<ModalHeader toggle={toggle}>
						<h3>{title}</h3>
					</ModalHeader>
					<ModalBody>
							<div className='video-container'>
									<Image
											className="image-card card-img-top"
											src={require(`../../assets/images/gallery/${image}`)}
											alt={alt}
											onClick={toggle}
									/>
							</div>
					</ModalBody>
			</Modal>
    </div>
  )
}

export default GalleryCard