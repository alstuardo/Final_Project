import './MyProducts.css'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ProductsContext } from '../../context/ProductsContext'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URLBASE } from '../../config/constants.js'
import Swal from 'sweetalert2'
import showFormAlert from '../../components/showFormAlert/showFormAlert.js'
const edit = <FontAwesomeIcon icon={faEdit} size='1x' />
const trash = <FontAwesomeIcon icon={faTrash} size='1x' />

const MyProducts = () => {
  const [inputValueDescription, setInputValueDescription] = useState('')
  const [category, setCategory] = useState('')
  const [inputValue, setInputValue] = useState({
    title: '',
    price: '',
    stock: '',
    imageUrl: ''
  })
  const [userProducts, setUserProducts] = useState([])

  const { isAuthenticated, activeUser, fnIsAuthenticated, getUserData } = useContext(UserContext)
  const { products, createProduct } = useContext(ProductsContext)
  const { removeNotify } = useContext(CartContext)
  const navigate = useNavigate()
  const userId = activeUser.id
  const token = window.sessionStorage.getItem('token')

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
    } else {
      navigate('/register')
    }
  }, [isAuthenticated])

  useEffect(() => {
    getUserData()
  }, [])

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }
  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setInputValueDescription(e.target.value)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const product = { ...inputValue, category, description: inputValueDescription, userId }
    const { title, price, stock, imageUrl, description } = inputValue
    if (title === '' || price === '' || stock === '' || imageUrl === '' || category === '' || description === '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debes llenar todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      await axios.post(`${URLBASE}/my-products`, product, { headers: { Authorization: `Bearer ${token}` } })
      getUserProducts()
      createProduct()
    }
  }

  const getUserProducts = async () => {
    const response = await axios.get(`${URLBASE}/my-products/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
    setUserProducts(response.data.message)
  }

  const handleDelete = async (productId) => {
    removeNotify()
    await axios.delete(`${URLBASE}/my-products/${productId}`, { headers: { Authorization: `Bearer ${token}` } })
    getUserProducts()
  }

  const handleEdit = (product) => {
    showFormAlert((newProductData) => {
      axios.put(`${URLBASE}/my-products/${product.id}`, { ...newProductData, userId: activeUser.id, id: product.id }, { headers: { Authorization: `Bearer ${token}` } })
      getUserProducts()
    })
  }

  // Faltaba poner userProducts en el array
  useEffect(() => {
    if (isAuthenticated) {
      getUserProducts()
    }
  }, [userProducts, products, activeUser])

  const inputStyle = {
    height: `${(inputValueDescription.length + 1) * 0.5}px`,
    transition: 'height 0.4s ease-in-out'
  }
  return (
    <>
      <Container className='twosection'>
        <Row className='justify-content-center'>
          <Col md={5} id='products'>
            <Container className='product'>
              <Card.Title id='my-products'>Mis Productos</Card.Title>
              {userProducts?.map((product) => (
                <Row key={product.id}>
                  <Card id='product'>
                    <Row>
                      <Col md={6}>
                        <p className='productDark'>{product.title.substring(0, 20)}</p>
                        <p className='productDark'>${product.price.toLocaleString('es-CL')}</p>
                        <p className='productDescription'>{product.description.substring(0, 80)}</p>
                      </Col>
                      <Col md={5}><img className='productImg' src={product.image_url} alt='productImg' /></Col>
                      <Col md={0} id='interaction'>
                        <Button className='interaction' onClick={() => handleEdit(product)}>{edit}</Button>
                        <Button className='interaction' onClick={() => handleDelete(product.id)}>{trash}</Button>
                      </Col>
                    </Row>
                  </Card>
                </Row>
              ))}
              <div className='horizontal'> </div>
            </Container>
          </Col>
          {/* <Col md={1} id='separator'>
            <div className='vertical'> </div>
          </Col> */}
          <Col md={5} id='post'>
            <Card className='new-product'>
              <Card.Title id='publish-now'>Publica un producto</Card.Title>
              <Row>
                <Form.Group as={Col} md='6'/* controlId='validationCustom01' */>
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='title'
                    placeholder='Nombre del producto'
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md='6'>
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select aria-label='Default select example' value={category} name='category' onChange={handleCategory}>
                    <option value='' disabled defaultValue=''>Categoria</option>
                    <option value='Juegos de Mesa'>Juegos de Mesa</option>
                    <option value='TCG'>TCG</option>
                    <option value='Figuras Coleccionables'>Figuras Coleccionables</option>
                    <option value='Mangas y Cómics'>Mangas y Cómics</option>
                    <option value='Álbumes y Láminas'>Álbumes y Láminas</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md='12' controlId='validationCustom01'>
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='imageUrl'
                    placeholder='https://imagendeejemplo.com'
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md='6' controlId='validationCustom01'>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    name='price'
                    placeholder='precio del producto'
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md='6' controlId='validationCustom01'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    name='stock'
                    placeholder='Stock del producto'
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md='12' controlId='validationCustom01'>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    className='description'
                    required
                    type='text'
                    name='description'
                    as='textarea'
                    placeholder='Descripción del producto'
                    maxLength='300'
                    style={inputStyle}
                    onChange={handleChangeDescription}
                    value={inputValueDescription}
                  />
                </Form.Group>
              </Row>
              <Row md={12}>
                <Form.Group>
                  <Button className='w-100' onClick={handleCreate}>Publicar Producto</Button>
                </Form.Group>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default MyProducts
