import React, {useContext, useState} from 'react'
import { Zoom, ToastContainer, toast, Flip } from 'react-toastify'
import { Form, FormGroup, Label, Input, Button, Container, InputGroup, InputGroupAddon } from 'reactstrap'
import 'react-toastify/dist/ReactToastify.css';
import { LoginApi } from '../../api/Api';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  })

  const [showPass, setShowPass] = useState(false)

  const handleShowPassword = () => setShowPass(!showPass)
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleLogin = async(event) => {
    event.preventDefault();

    try {
      const resp = await LoginApi.post("/user/login", formData);
      const { data } = resp; 
      if(data.response){
        const date = new Date();
        login(data.data.token, date);
        router.push("/guia");
      } else {
        toast(data.message, {
          autoClose: 800,
          type: 'error'
        });
      }
    } catch (error) {
      const {message, response} = error;
      if(response){
        toast(response?.data.message,{
          autoClose: 800,
          type:"error"
        });
      } else {
        toast(message,{
          autoClose: 800,
          type:"error"
        });
      }
    }    
  }
  return (
    <Container className='login-container'>
      <ToastContainer
        transition={Flip}
      />
      <div className='login p-4 m-5'>
        <h1 className='text-center'>Iniciar Sesión</h1>
        <hr/>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label className='login-label' htmlFor="usuarioField">
              Usuario
            </Label>
            <Input 
              id="usuarioField"
              name="userName"
              type='text'
              autoComplete='false'
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label className='login-label' htmlFor="passwordField">
              Contraseña
            </Label>
            <InputGroup>
              <Input 
                id="passwordField"
                name="password"
                type={showPass ?"text" :"password"}
                autoComplete='false'
                value={formData.password}
                onChange={handleInputChange}
                required
                />
                <InputGroupAddon addonType='append' className='password-btn-container p-r-2'>
                  <button type='button' className='password-button' onClick={handleShowPassword}>
                    <a className={`fa ${showPass ?"fa-eye" :"fa-eye-slash"}`} />
                  </button>
                </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <Button type='submit'>
            Acceder
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default LoginForm