import './Register.css'
import { Card, Button, Col, Form, Row } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { URLBASE } from '../../config/constants'

const Register = () => {
  const [validated, setValidated] = useState(false)
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    password: '',
    email: ''
  })
  const { isAuthenticated, fnIsAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/login')
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
      try {
        await axios.post(`${URLBASE}/register`, user)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario registrado Exitosamente 😊',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/login')
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Este usuario ya existe',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
      navigate('/profile')
    }
  }, [isAuthenticated])

  return (
    <div className='principal-register'>
      <Card className='register-card container-sm'>
        <Card.Title className='title-name'>Regístrate Ahora!</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Form.Group className='mb-3' as={Col} md='6' controlId='validationCustom01'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control required type='text' name='firstName' placeholder='First name' onChange={handleChange} />
              <Form.Control.Feedback>Aceptado!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationCustom02'>
              <Form.Label>Apellido</Form.Label>
              <Form.Control required type='text' name='lastName' placeholder='Last name' onChange={handleChange} />
              <Form.Control.Feedback>Aceptado!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group className='mb-3' as={Col} md='6' controlId='validationCustom03'>
              <Form.Label>Número de teléfono</Form.Label>
              <Form.Control type='text' name='phoneNumber' placeholder='955544433' onChange={handleChange} required />
              <Form.Control.Feedback type='invalid'>
                Por favor ingresa un número válido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationCustom04'>
              <Form.Label>Dirección</Form.Label>
              <Form.Control type='text' name='address' placeholder='Dirección' onChange={handleChange} required />
              <Form.Control.Feedback type='invalid'>
                Por favor ingresa una dirección válida
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type='email' name='email' placeholder='tucorreo@mail.com' onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' placeholder='Password' onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className='mb-3'>
              <Form.Check
                required
                label='Acepto los términos y condiciones'
                feedback='Debes aceptar los términos y condiciones para crear una cuenta'
                feedbackType='invalid'
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Button type='submit'>Registrarme</Button>
          </Row>
        </Form>
      </Card>
      <p id='haveAccount'>Ya tienes una cuenta?</p>
      <Button type='button' onClick={handleClick}>Iniciar Sesión</Button>
    </div>
  )
}

export default Register
