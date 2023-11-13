import React from 'react'
import Features from '../features/Features'
import AboutUs from '../features/AboutUs'
import FloatingButton from '../basic/FloatingButton'  
import UpButton from '../basic/UpButton'  
import LandBot from '../basic/LandBot'
import PhotosGallerie from '../features/PhotosGallerie'
import Clients from '../features/Clients'
import Projects from '../features/Projects'
import Convenios from '../features/Convenios'
import SoporteButton from '../basic/SoporteButton'
import { ContactForm } from '../basic/ContactForm'
import ContentCarousel from '../basic/ContentCarousel'


const Build = () => {
  return (
    <div>
      <ContentCarousel />
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
        <section id="Demo">
          <ContactForm />
        </section>
        <SoporteButton />
        <FloatingButton />
        <UpButton />
    </div>
  )
}

export default Build