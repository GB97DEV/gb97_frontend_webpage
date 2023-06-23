import React from 'react'

const FloatingButton = () => {
  return (
    <a href={`https://wa.me/593978760521?text=Requiero%20soporte%20t%C3%A9cnico.`} target='_blank'>
        <button className="floating-btn">
            <i className="fa fa-whatsapp fa-lg fa-inverse" ></i>
        </button>
    </a>
  );
}

export default FloatingButton;