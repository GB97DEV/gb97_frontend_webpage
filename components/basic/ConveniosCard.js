import React, {useState} from 'react'
import Image from 'next/image'
import { Card, Modal, ModalBody, ModalHeader } from 'reactstrap';

const ConveniosCard = ({image='', alt='', title='', size='lg'}) => {
  const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
  return (
    <div>
			<Card className="card-shadow img-ho">
				<Image
						className="image-card card-img-top"
						src={`https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/Convenios/${image}`}
						alt={alt}
						onClick={toggle}
						width={200}
						height={250}
						loading='lazy'
				/>

				<div className='title-container'>
					<div className='img-title'>
						<span>{title}</span>
					</div>
				</div>
			</Card>
			<Modal 
					size={size}
					isOpen={modal}
					toggle={toggle}
			>
					<ModalHeader toggle={toggle}>
						<h3>{title}</h3>
					</ModalHeader>
					<ModalBody>
							<div className='video-container position-relative'>
                <Image
                    className="image-card card-img-top"
                    src={`https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/Convenios/${image}`}
                    alt={alt}
                    onClick={toggle}
                    layout='fill'
                    loading='lazy'
                />
							</div>
					</ModalBody>
			</Modal>
    </div>
  )
}

export default ConveniosCard