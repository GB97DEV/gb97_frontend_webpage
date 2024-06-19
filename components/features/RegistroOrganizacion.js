import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Select
} from "reactstrap";
import { ToastContainer, toast, Flip } from 'react-toastify';
import { LoginApi } from '../../api/Api';

import 'react-toastify/dist/ReactToastify.css';

const RegistroOrganizacion = () => {
  const [selectedOption, setSelectedOption] = useState("0");
  const [formData, setFormData] = useState({
    organizationId: "",
    organizationAlias: "",
    organizationName: "",
    organizationEmail: "",
    organizationCellphone: "",
    razon_social: "",
    nombre_comercial: "",
    direccion_matriz: "",
    obligatorio_contabilidad: null,
    type: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = type === 'checkbox' ? e.target.checked : (type === 'radio' ? value === 'si' : value);

    // Convertir a mayúsculas para los campos específicos
    if (name === "organizationAlias" || name === "organizationName") {
      newValue = newValue.toUpperCase();
    }

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await LoginApi.post("/organizaciones", formData);
      if (data.response) {
        toast(data.message, {
          autoClose: 800,
          type: 'success'
        });
        ResetFields();
      } else {
        toast(data.message, {
          autoClose: 800,
          type: 'error'
        });
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message || error.response.data.error, {
        autoClose: 1000,
        type: "error"
      });
    }
    // Aquí podrías agregar la lógica para enviar los datos a un servidor
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setFormData({
      ...formData,
      type: parseInt(e.target.value)
    });
  };

  const ResetFields = () => {
    setFormData({
      organizationId: "",
      organizationAlias: "",
      organizationName: "",
      organizationEmail: "",
      organizationCellphone: "",
      razon_social: "",
      nombre_comercial: "",
      direccion_matriz: "",
      obligatorio_contabilidad: null,
      type: 0,
    });
    setSelectedOption("0")
  };  

  return (
    <Container>
      <ToastContainer
        transition={Flip}
      />
      <div className="feature4 pt-1 pb-1">
        <Row className="justify-content-center">
          <Col md="12" className="text-center">
            <h2 className="title">Formulario de Registro</h2>
          </Col>
        </Row>
        <Row className="justify-content-center p-2 mb-3">
          <Col className="mt-2 mb-2" md="12">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for={"type"}>
                      Tipo <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input 
                      type="select" 
                      name="select" 
                      id="exampleSelect" 
                      value={selectedOption} 
                      onChange={handleSelectChange}
                    >
                      <option value="0" disabled>Escoja una opción</option>
                      <option value="1">Natural</option>
                      <option value="2">Jurídica</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="p-1" form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="organizationId">
                      RUC <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="organizationId"
                      id="organizationId"
                      value={formData.organizationId}
                      onChange={handleChange}
                      maxLength={13}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="p-1" form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="organizationAlias">
                      Alias de la Organización{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="organizationAlias"
                      id="organizationAlias"
                      value={formData.organizationAlias}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="organizationName">
                      Nombre de la Organización{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="organizationName"
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="p-1" form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="organizationEmail">
                      Correo Electrónico <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="email"
                      name="organizationEmail"
                      id="organizationEmail"
                      value={formData.organizationEmail}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="organizationCellphone">
                      Número de Teléfono <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="tel"
                      name="organizationCellphone"
                      id="organizationCellphone"
                      value={formData.organizationCellphone}
                      onChange={handleChange}
                      maxLength={10}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="p-1" form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="razon_social">
                      Razón Social <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="razon_social"
                      id="razon_social"
                      value={formData.razon_social}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="nombre_comercial">
                      Nombre Comercial <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="nombre_comercial"
                      id="nombre_comercial"
                      value={formData.nombre_comercial}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="p-1" form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="direccion_matriz">
                      Dirección Matriz <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="direccion_matriz"
                      id="direccion_matriz"
                      value={formData.direccion_matriz}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label>Obligado a llevar contabilidad?</Label>
                <Row form>
                  <Col md={1}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="obligatorio_contabilidad"
                          id="contabilidadSi"
                          value={"si"}
                          checked={formData.obligatorio_contabilidad === true}
                          onChange={handleChange}
                        />{" "}
                        Sí
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={1}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="obligatorio_contabilidad"
                          id="contabilidadNo"
                          value={"no"}
                          checked={formData.obligatorio_contabilidad === false}
                          onChange={handleChange}
                        />{" "}
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>

              <Row className="justify-content-center">
                <Button type="submit" color="primary">
                  Registrar
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RegistroOrganizacion;
