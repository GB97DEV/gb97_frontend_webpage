import Image from "next/image"
import {Row, Col, Container } from "reactstrap"
import { Store } from "../basic/Store"
import { BeneficiosApp } from "../../interface/BeneficiosApp"
import { ContactForm } from '../basic/ContactForm'
import TrackForm from "../basic/TrackForm"

const EncuestaTrack = () => {
  return (
    <div className="aplicaciones">
      <div className="container-info">
      <section>
        <TrackForm />
      </section>
      </div>
    </div>
  )
}

export default EncuestaTrack;