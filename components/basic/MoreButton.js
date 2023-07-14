import React, {useState} from 'react'
import { Card, Modal, ModalBody, ModalHeader, CardImgOverlay, CardTitle } from 'reactstrap';

const MoreButton = ({file = ''}) => {
  const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
  return (
    <div>
      <button className='more-button' onClick={toggle}>
        <span className='more-text'>
          Mas Información
        </span>
          <i className='more-icon fa fa-arrow-right'></i>
      </button>
      <Modal 
					size='lg'
					isOpen={modal}
					toggle={toggle}
			>
        <ModalBody>
            <div className='pdf-container'>
              <embed className='pdf-embed' src={`https://gb97.ec/tripticos/${file}`} />
            </div>
        </ModalBody>
			</Modal>
    </div>
  )
}

export default MoreButton