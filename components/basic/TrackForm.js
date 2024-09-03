import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image"
import { Container, Form, FormGroup, Label, Input, Button, FormText, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import SignatureCanvas from 'react-signature-canvas';
import 'react-toastify/dist/ReactToastify.css';

const TrackForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    modeloAuto: '',
    placas: '',
    instalacionServicio: '',
    conformeInstalacion: '',
    atencionEjecutivo: '',
    appInstalada: '',
    manualEntregado: '',
    aceptoRecomendaciones: false,
    firmaBase64: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const sigCanvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);


  useEffect(() => {
    if (sigCanvasRef.current) {
      const canvas = sigCanvasRef.current.getCanvas();
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF'; // Color de fondo blanco
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [sigCanvasRef]);


  const validateStep = () => {
    let errors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.nombres) {
        errors.nombres = true;
        isValid = false;
      }
      if (!formData.apellidos) {
        errors.apellidos = true;
        isValid = false;
      }
      if (!formData.telefono) {
        errors.telefono = true;
        isValid = false;
      }
      if (!formData.email) {
        errors.email = true;
        isValid = false;
      }
      if (!formData.modeloAuto) {
        errors.modeloAuto = true;
        isValid = false;
      }
      if (!formData.placas) {
        errors.placas = true;
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.instalacionServicio) {
        errors.instalacionServicio = true;
        isValid = false;
      }
      if (!formData.conformeInstalacion) {
        errors.conformeInstalacion = true;
        isValid = false;
      }
      if (!formData.atencionEjecutivo) {
        errors.atencionEjecutivo = true;
        isValid = false;
      }
      if (!formData.appInstalada) {
        errors.appInstalada = true;
        isValid = false;
      }
      if (!formData.manualEntregado) {
        errors.manualEntregado = true;
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.firmaBase64) {
        errors.firmaBase64 = true;
        isValid = false;
        toast.error("Por favor, guarda la firma antes de continuar.");
      }
    }

    if (step === 4) {
      if (!formData.aceptoRecomendaciones) {
        errors.aceptoRecomendaciones = true;
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };


  const saveSignature = () => {
    if (sigCanvasRef.current.isEmpty()) {
      toast.error("La firma está vacía. Por favor, firma antes de guardar.");
    } else {
      const signatureDataURL = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
      setFormData({ ...formData, firmaBase64: signatureDataURL });
      toast.success("Firma guardada correctamente.");
    }
  };

  const clearSignature = () => {
    sigCanvasRef.current.clear();
    setFormData({ ...formData, firmaBase64: '' });
    const canvas = sigCanvasRef.current.getCanvas();
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF'; // Rellenar de blanco nuevamente
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleNextStep = async () => {
    if (!validateStep()) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setIsLoading(true);
  
    if (step === 4) {
      let dataToSubmit = {
        sign: formData.firmaBase64,
        name: formData.nombres,
        lastName: formData.apellidos,
        phoneNumber: formData.telefono,
        email: formData.email,
        carModel: formData.modeloAuto,
        carPlates: formData.placas,
        serviceInstalExperience: formData.instalacionServicio,
        qualityService: formData.atencionEjecutivo,
        serviceExperience: formData.conformeInstalacion,
        downloadApp: formData.appInstalada,
        userManual: formData.manualEntregado,
        recommendations: formData.aceptoRecomendaciones ? "Acepto los términos y recomendaciones" : ""
      };

      try {
        console.log(dataToSubmit);

        const response = await fetch('https://api-dev-crm.gb97.ec/forms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit),
        });
  
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Form submitted successfully', result);
        // Muestra un toast de éxito y avanza al siguiente paso
        toast.success("Formulario enviado correctamente.");
        setShowThankYou(true); // Mostrar pantalla de agradecimiento
        setStep(step + 1);
      } catch (error) {
        // Muestra un mensaje de error si ocurre un error al enviar el formulario
        console.error('Error submitting the form:', error);
        toast.error("Hubo un error al enviar el formulario.");
      } finally {
        // Rehabilita el botón de envío al final de la operación
        setIsLoading(false);
      }
    } else {
      setStep(step + 1);
      setIsLoading(false);  // Habilita el botón
    }
  };
  

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <ToastContainer />

    <Container className='login-container'>

    <h1 className='text-center p-2'>  <Image
                className="app-logo"
                src={"https://bucket-images-gb97.s3.amazonaws.com/upload/webpage/images/logos-app/gb97-track.png"}
                alt={"logo track"}
                width={50}
                height={50}
              />Encuesta Track GB97</h1>
      <div className='login p-4 m-3'>
      {showThankYou ? (
          <div className="thank-you-screen">
            <h2>¡Gracias por tu envío!</h2>
            <p>Tu respuesta ha sido enviada correctamente. Si necesitas más ayuda, no dudes en contactarnos.</p>
            <li>administraciontrack@gb97.ec</li><li>informacion@gb97.ec</li><li><a href="https://www.gb97.ec">https://www.gb97.ec</a></li>
            <Button className='mt-3' color="primary" onClick={() => window.close()}>
              Cerrar
            </Button>
          </div>
        ) : (
      <Form>
        {step === 1 && (
          <>
            <FormGroup>
              <Label for="nombres">Nombres</Label>
              <Input
                type="text"
                name="nombres"
                id="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                style={{ borderColor: validationErrors.nombres ? 'red' : '' }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellidos">Apellidos</Label>
              <Input
                type="text"
                name="apellidos"
                id="apellidos"
                value={formData.apellidos}
                style={{ borderColor: validationErrors.apellidos ? 'red' : '' }}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="telefono">Número de Teléfono</Label>
              <Input
                type="tel"
                name="telefono"
                id="telefono"
                value={formData.telefono}
                style={{ borderColor: validationErrors.telefono ? 'red' : '' }}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Correo Electrónico</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                style={{ borderColor: validationErrors.email ? 'red' : '' }}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="modeloAuto">Modelo de Auto</Label>
              <Input
                type="text"
                name="modeloAuto"
                id="modeloAuto"
                value={formData.modeloAuto}
                style={{ borderColor: validationErrors.modeloAuto ? 'red' : '' }}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="placas">Placas</Label>
              <Input
                type="text"
                name="placas"
                id="placas"
                value={formData.placas}
                style={{ borderColor: validationErrors.placas ? 'red' : '' }}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </>
        )}

        {step === 2 && (
          <>
            <FormGroup>
              <Label>¿Cómo estuvo la instalación del servicio TRACK GB97?</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="instalacionServicio"
                    value="buena"
                    style={{ boxShadow: validationErrors.instalacionServicio ? '0 0 0 2px red' : '' }}
                    onChange={handleInputChange}
                    required
                  />
                  Buena
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="instalacionServicio"
                    value="mala"
                    onChange={handleInputChange}
                  />
                  Mala
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="instalacionServicio"
                    value="excelente"
                    onChange={handleInputChange}
                  />
                  Excelente
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="instalacionServicio"
                    value="otros"
                    onChange={handleInputChange}
                  />
                  Otros
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label>¿Está conforme con la instalación realizada?</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="conformeInstalacion"
                    value="si"
                    style={{ boxShadow: validationErrors.conformeInstalacion ? '0 0 0 2px red' : '' }}
                    onChange={handleInputChange}
                    required
                  />
                  Sí
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="conformeInstalacion"
                    value="no"
                    onChange={handleInputChange}
                  />
                  No
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label>¿Cómo estuvo la atención por parte del ejecutivo Track GB97?</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="atencionEjecutivo"
                    value="buena"
                    style={{ boxShadow: validationErrors.atencionEjecutivo ? '0 0 0 2px red' : '' }}
                    onChange={handleInputChange}
                    required
                  />
                  Buena
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="atencionEjecutivo"
                    value="mala"
                    onChange={handleInputChange}
                  />
                  Mala
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="atencionEjecutivo"
                    value="excelente"
                    onChange={handleInputChange}
                  />
                  Excelente
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="atencionEjecutivo"
                    value="otros"
                    onChange={handleInputChange}
                  />
                  Otros
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label>¿Tiene descargada la aplicación Track GB97 en su celular?</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="appInstalada"
                    value="si"
                    onChange={handleInputChange}
                    style={{ boxShadow: validationErrors.appInstalada ? '0 0 0 2px red' : '' }}
                    required
                  />
                  Sí
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="appInstalada"
                    value="no"
                    onChange={handleInputChange}
                  />
                  No
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="appInstalada"
                    value="otros"
                    onChange={handleInputChange}
                  />
                  Otros
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label>¿Le entregaron el manual de usuario?</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="manualEntregado"
                    value="si"
                    style={{ boxShadow: validationErrors.manualEntregado ? '0 0 0 2px red' : '' }}
                    onChange={handleInputChange}
                    required
                  />
                  Sí
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="manualEntregado"
                    value="no"
                    onChange={handleInputChange}
                  />
                  No
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="manualEntregado"
                    value="otros"
                    onChange={handleInputChange}
                  />
                  Otros
                </Label>
              </FormGroup>
            </FormGroup>
          </>
        )}

        {step === 3 && (
              <>
                <h4>Firma Digital</h4>
                <p>Por favor, firma a continuación:</p>
                <SignatureCanvas
                  ref={sigCanvasRef}
                  penColor="black"
                  canvasProps={{
                    width: 385,
                    height: 200,
                    className: 'sigCanvas',
                    color: 'white',
                  }}
                />
                <Button color="danger" onClick={clearSignature} className="m-2">
                  Limpiar
                </Button>
                <Button color="primary" onClick={saveSignature} className="m-2">
                  Guardar Firma
                </Button>
              </>
            )}

        {step === 4 && (
          <>
            <h4>Recomendaciones Track GB97</h4>
            <p>
              Estimado Cliente, después de instalar en su vehículo nuestro dispositivo de rastreo vehicular,
              le pedimos seguir las siguientes recomendaciones:
            </p>
            <ul>
              <li>No comparta su contraseña con nadie.</li>
              <hr></hr>
              <li>Conocer la ubicación exacta del botón de pánico.</li>
              <hr></hr>
              <li>Solicitar al ejecutivo de Atención al Cliente la instalación de la aplicación Track GB97 en su celular.</li>
              <hr></hr>
              <li>Solicitar al ejecutivo de Atención al Cliente el manual de Usuario.</li>
              <hr></hr>
              <li>Contestar las preguntas citadas anteriormente.</li>
              <hr></hr>
            </ul>
            <p>
              Si tiene alguna inquietud no dude en contactarnos:
             <li>administraciontrack@gb97.ec</li><li>informacion@gb97.ec</li><li><a href="https://www.gb97.ec">https://www.gb97.ec</a></li>
            </p>
            <FormGroup check>
              <Label check className='p-2 mb-2'>
                <Input
                  type="checkbox"
                  name="aceptoRecomendaciones"
                  onChange={handleCheckboxChange}
                  style={{ boxShadow: validationErrors.aceptoRecomendaciones ? '0 0 0 2px red' : '' }}
                  required
                />
                He leído y acepto las recomendaciones
              </Label>
            </FormGroup>
          </>
        )}
        {step > 1 && (
              <Button className='m-2' type="button" color="primary" onClick={handlePrevStep}>
                Atras
              </Button>
            )}
            {step < 4 && (
              <Button className='m-2' type="button" color="primary" onClick={handleNextStep}>
                Siguiente
              </Button>
            )}
            {step === 4 && (
              <Button 
                className='m-2' 
                type="submit" 
                color="primary" 
                onClick={handleNextStep}
                disabled={isLoading}  // Deshabilita el botón si isLoading es true
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </Button>
            )}
      </Form>
      )}
      </div>
    </Container>
    </>
  );
};

export default TrackForm;
