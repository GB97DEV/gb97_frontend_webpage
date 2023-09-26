import React from 'react';
import Image from 'next/image';
import Banner from "../../assets/images/Ban.webp"

const BannerPublicity = () => {
  return (
    <div className="banner-publicity-container">
      <Image 
        className="banner-image"
        src={Banner}
        loading='lazy'
        alt="banner"
        />
    </div>
  )
}

export default BannerPublicity;