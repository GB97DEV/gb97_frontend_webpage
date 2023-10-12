import React, { useState, useEffect } from 'react'

const SoporteButton = () => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <a href={`https://gb97.ec/soporte/`} target='_blank' rel="noreferrer">
        <button className={isVisible ?'support-btn aparecer' :'support-btn'}>
            <i className="fa fa-cog fa-lg fa-inverse" />
        </button>
    </a>
  );
}

export default SoporteButton;