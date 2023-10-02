import React from 'react'
import Banner2 from '../banner/Banner2'
import Features from '../features/Features'
import AboutUs from '../features/AboutUs'
import FloatingButton from '../basic/FloatingButton'  
import UpButton from '../basic/UpButton'  
import LandBot from '../basic/LandBot'
import PhotosGallerie from '../features/PhotosGallerie'
import Clients from '../features/Clients'
import Projects from '../features/Projects'
import Convenios from '../features/Convenios'
import BannerPublicity from "../banner/BannerPublicity"


const Build = () => {
  return (
    <div>
        <section id="#">
          <Banner2 />
        </section>
        <section id='About'>
          <AboutUs />
        </section>
        <section id='Projects' className='bg-light'>
          <Projects />
        </section>
        <section id='Features'>
          <Features />
        </section>
        <section id='Organizations'>
          <PhotosGallerie />
          <Clients />
        </section>
        <section id='Convenios'>
          <Convenios />
        </section>
        <FloatingButton />
        <UpButton />
    </div>
  )
}

export default Build