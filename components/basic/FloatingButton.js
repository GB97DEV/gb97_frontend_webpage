import React from 'react'

const FloatingButton = () => {
  return (
    <a href={`https://wa.me/593979297465?text=Requiero%20soporte%20t%C3%A9cnico.`} target='_blank' rel="noreferrer">
        <button className="floating-btn">
            <i className="fa fa-whatsapp fa-lg fa-inverse" ></i>
        </button>
    </a>
  );
}

export default FloatingButton;