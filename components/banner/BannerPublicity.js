import React from 'react';
import Image from 'next/image';

const BannerPublicity = () => {
  return (
    <div className="banner-publicity-container">
      <Image 
        className="banner-image"
        src="https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/Ban.webp"
        loading='lazy'
        alt="banner"
        width={"75%"}
        height={200}
        />
    </div>
  )
}

export default BannerPublicity;