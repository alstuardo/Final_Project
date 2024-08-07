import './ProfileForm.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { URLBASE } from '../../config/constants'

const ProfileForm = ({ activeUser }) => {
  const [user, setUser] = useState(activeUser)
  const [photo, setPhoto] = useState('')
  const id = activeUser.id

  const { fnIsAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleChangePhoto = (e) => {
    setPhoto({ [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = { ...activeUser, ...user }
    const response = await axios.put(`${URLBASE}/profile/${id}`, userData)
    window.alert(`Usuario actualizado con éxito: ${response.data.data.email}`)
  }

  const handleUpdatePhoto = async (e) => {
    e.preventDefault()
    console.log(photo)
    const response = await axios.put(`${URLBASE}/profile/photo/${id}`, photo)
    // FALTA VALIDAR QUE NO PASE VACIO EL VALOR DE PHOTO A LA DB porque queda NUll
    if (photo === '') {
      Swal.fire({
        title: 'Debes ingresa una URL'
      })
    } else {
      setPhoto(response)
      Swal.fire({
        title: 'Foto actualizada con éxito'
      })
    }
  }

  const handleDeletePhoto = async (e) => {
    e.preventDefault()
    const response = await axios.put(`${URLBASE}/profile/default-photo/${id}`)
    Swal.fire({
      title: `${response.data.message}`
    })
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault()
    const response = await axios.delete(`${URLBASE}/profile/${id}`)
    window.sessionStorage.removeItem('token')
    fnIsAuthenticated(false)
    navigate('/')
    window.alert(`${response.data.message}`)
  }

  return (
    <Container fluid className='py-4 px-2'>
      <Container>
        <Row className='text-center mb-5'>
          <Col className='d-flex justify-content-center align-items-center' md={8}>
            <Form className='w-100'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control name='photoUrl' type='text' placeholder='URL de la imagen' onChange={handleChangePhoto} />
              </Form.Group>
              <Container className='d-flex justify-content-around p-0'>
                <Button className='w-50 me-2' variant='primary' type='submit' onClick={handleUpdatePhoto}>
                  Subir Foto
                </Button>
                <Button className='w-50' variant='primary' type='submit' onClick={handleDeletePhoto}>
                  Eliminar Foto
                </Button>
              </Container>
            </Form>
          </Col>
          <Col md={4}>
            <Image src={activeUser.photoUrl} roundedCircle fluid className='w-50' />
          </Col>
        </Row>
      </Container>
      <Container fluid className='text-center gap-5'>
        <Form>
          <Row className='mb-3'>
            <Col>
              <Form.Label>Nombre</Form.Label>
              <Form.Control name='firsName' placeholder={activeUser.firstName} onChange={handleChange} />
            </Col>
            <Col>
              <Form.Label>Apellido</Form.Label>
              <Form.Control name='lastName' placeholder={activeUser.lastName} onChange={handleChange} />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control name='phoneNumber' placeholder={activeUser.phoneNumber} onChange={handleChange} />
            </Col>
            <Col>
              <Form.Label>Dirección</Form.Label>
              <Form.Control name='address' placeholder={activeUser.address} onChange={handleChange} />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' placeholder={activeUser.email} disabled />
            </Col>
            <Col>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name='password' placeholder='********' onChange={handleChange} />
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <Button className='w-75' variant='primary' type='submit' onClick={handleSubmit}>
                Guardar Cambios
              </Button>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <Button className='w-25' variant='primary' type='submit' onClick={handleDeleteUser}>
                Eliminar cuenta
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  )
}
export default ProfileForm
