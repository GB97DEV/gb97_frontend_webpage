import React from 'react'
import Banner2 from '../banner/Banner2'
import Features from '../features/Features'
import AboutUs from '../features/AboutUs'
import FloatingButton from '../basic/FloatingButton'  
import UpButton from '../basic/UpButton'  
import LandBot from '../basic/LandBot'
import Track from '../features/Track'

const Build = () => {
  return (
    <div>
        <Banner2 />
        <section id='About'>
          <AboutUs />
        </section>
        <section id='Track'>
          <Track />
        </section>
        <section id='Features'>
          <Features />
        </section>
        <FloatingButton />
        <UpButton />
        <LandBot />
    </div>
  )
}

export default Build