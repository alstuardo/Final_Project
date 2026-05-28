import './Login.css'
import { Card, Button, Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { URLBASE } from '../../config/constants'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const { fnIsAuthenticated, isAuthenticated } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${URLBASE}/login`, formData)
      window.sessionStorage.setItem('token', response.data.message.token)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sesión Iniciada con Exito 😊',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/profile')
      fnIsAuthenticated(true)
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Credenciales Incorrectas',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
      navigate('/profile')
    }
  }, [isAuthenticated])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleClick = () => {
    navigate('/register')
  }

  return (
    <div className='principal-login'>
      <Card className='login-card'>
        <Card.Title className='title-name'>Iniciar Sesión</Card.Title>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type='email' placeholder='tucorreo@mail.com' name='email' onChange={handleChange} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' name='password' onChange={handleChange} />
          </Form.Group>
          <Container className='boton-login'>
            <Button className='boton-login' type='submit' onClick={handleSubmit}>Iniciar Sesión</Button>
          </Container>
        </Form>
      </Card>
      <p id='nohaveAccount'>Aún no tienes una cuenta?</p>
      <Button type='button' onClick={handleClick}>Registrate!</Button>
    </div>
  )
}
export default Login
