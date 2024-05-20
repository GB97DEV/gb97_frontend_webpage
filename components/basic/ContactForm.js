import axios from "axios";
import React, {useState} from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { EmailApi } from "../../api/Api";


export const ContactForm = ({app = "Ninguna"}) => {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    cargo: "",
    organizacion: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const clearForm = () => {
    setForm({
      nombres: "",
      apellidos: "",
      cargo: "",
      organizacion: "",
      correo: "",
      telefono: "",
      mensaje: ""
    })
  }

  const Enviar = async(event) => {
    event.preventDefault();
    try{
      const {data} = await EmailApi.post("/send-mail/api",{...form, documentName: "Demo", app})
      if(data){
        clearForm();
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="spacer bg-light">
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h3 className="title font-bold">¿Deseas conocer más acerca de nuestras aplicaciones?</h3>
              <h6 className="subtitle">
                Llena el siguiente formulario y nosotros nos contactaremos.
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="contact1">
        <Row>
          <Container className="">
            <div>
              <Row className="m-0 d-flex justify-content-center" >
                <Col lg="9" className="form-container mt-5 mb-2 p-4">
                  <div className="contact-box p-r-40">
                    <Form onSubmit={Enviar}>
                      <Row>
                        <Col lg="6" md="6">
                          <FormGroup className="m-t-15" >
                            <Input className="input-text" type="text" placeholder="Nombres" name="nombres" value={form.nombres} onChange={handleInputChange} required autoComplete="off"/>
                          </FormGroup>
                        </Col>
                        <Col lg="6" md="6">
                          <FormGroup className="m-t-15" >
                            <Input className="input-text" type="text" placeholder="Apellidos" name="apellidos" value={form.apellidos} onChange={handleInputChange} required autoComplete="off"/>
                          </FormGroup>
                        </Col>
                        <Col lg="6" md="6">
                          <FormGroup className="m-t-15" >
                            <Input type="text" placeholder="Cargo" name="cargo" value={form.cargo} onChange={handleInputChange} autoComplete="off"/>
                          </FormGroup>
                        </Col>
                        <Col lg="6" md="6">
                          <FormGroup className="m-t-15">
                            <Input type="email" placeholder="Correo" name="correo" value={form.correo} onChange={handleInputChange} required  autoComplete="off"/>
                          </FormGroup>
                        </Col>
                        <Col lg="6" md="6">
                          <FormGroup className="mt-2" >
                            <Input type="text" placeholder="Organización" name="organizacion" value={form.organizacion} onChange={handleInputChange} required  autoComplete="off"/>
                          </FormGroup>
                        </Col>
                        <Col lg="6" md="6">
                          <FormGroup className="m-t-15" >
                            <Input type="text" placeholder="Teléfono" name="telefono" value={form.telefono} onChange={handleInputChange} required  autoComplete="off"/>
                          </FormGroup>
                        </Col>
                        <Col lg="12">
                          <FormGroup className="m-t-15">
                            <Input
                              type="textarea"
                              name="mensaje"
                              placeholder="Mensaje"
                              onChange={handleInputChange}
                              value={form.mensaje}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12" xl="12" lg="12" xs="12">
                          <button
                            type="submit"
                            className="btn-form btn mt-2"
                          >
                            <span className="text">
                              Enviar
                            </span>
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Row>
      </div>
    </div>
  )
}