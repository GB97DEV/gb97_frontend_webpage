import React from 'react'
import Banner2 from '../banner/Banner2'
import Features from '../features/Features'
import AboutUs from '../features/AboutUs'
import FloatingButton from '../basic/FloatingButton'  
import UpButton from '../basic/UpButton'  
import LandBot from '../basic/LandBot'
import PhotosGallerie from '../features/PhotosGallerie'
import Clients from '../features/Clients'

const Build = () => {
  return (
    <div>
        <section id="#">
          <Banner2 />
        </section>
        <section id='About'>
          <AboutUs />
        </section>
        <section id='Gallery' className='bg-light'>
          <PhotosGallerie />
        </section>
        <section id='Features'>
          <Features />
        </section>
        <section id='Organizations' >
          <Clients />
        </section>
        <FloatingButton />
        <UpButton />
    </div>
  )
}

export default Build