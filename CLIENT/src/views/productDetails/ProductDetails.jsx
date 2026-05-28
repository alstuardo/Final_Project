import './ProductDetails.css'
import { useContext, useState, useEffect } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import StarRating from '../../components/startRating/StarRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { URLBASE } from '../../config/constants'
import LikeButton from '../../components/likeButton/LikeButton'
import axios from 'axios'
import Swal from 'sweetalert2'

const add = <FontAwesomeIcon icon={faShoppingCart} size='2x' />

const ProductDetails = () => {
  const { id } = useParams()
  const productId = +id
  const { getFavorites } = useContext(ProductsContext)
  const { activeUser, fnIsAuthenticated, isAuthenticated } = useContext(UserContext)
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState({
    title: '',
    description: '',
    stock: '',
    price: '',
    imageUrl: '',
    score: 0
  })

  const userId = activeUser.id
  const navigate = useNavigate()

  const getProductDetails = () => {
    axios.get(`${URLBASE}/product-details/${id}`)
      .then((response) => {
        setProduct({ ...response.data.message[0], id: productId })
      })
  }

  const toRegister = () => {
    Swal.fire({
      title: 'Para ver el carrito debes iniciar sesión o registrarte',
      showCancelButton: true,
      confirmButtonColor: '#756AB6',
      cancelButtonColor: '#E0AED0',
      confirmButtonText: 'Registrate',
      cancelButtonText: 'Quedarme aquí'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/register')
      }
    })
  }

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    getProductDetails()
  }, [])

  useEffect(() => {
    getFavorites(activeUser.id)
  }, [])

  const { title, description, stock, price, image_url: imageUrl } = product
  const handleCart = (product) => {
    if (userId) {
      addToCart(product)
      navigate('/cart')
    } else {
      addToCart(product)
      toRegister()
    }
  }

  return (
    <Container className='pdcontainer'>
      <Card className='principal-box'>
        <Card.Body className='wholespace'>
          <div id='big-photo'>
            <img src={imageUrl} className='big-img' alt='Imagen grande' />
          </div>
          <div className='details'>
            <section className='icons'>
              <LikeButton userId={userId} productId={productId} />
              <div className='action' onClick={() => { handleCart(product) }}>{add}
              </div>
            </section>
            <Card.Title className='title-name'>{title}</Card.Title>
            <StarRating totalStars={5} productId={productId} />
            <Card.Text className='description'>{description}</Card.Text>
            <Row className='count'>
              <Col>
                <Card.Text className='stock'>Stock:{stock} Unidades</Card.Text>
              </Col>
              <Col>
                <Card.Text className='price'>${price.toLocaleString('es-CL')}</Card.Text>
              </Col>
            </Row>
            <Button id='addCart' type='button' onClick={() => addToCart(product)}>Agregar al carrito</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProductDetails
