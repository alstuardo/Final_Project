import './Cart.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CartCard from '../../components/cartCard/CartCard'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import { ProductsContext } from '../../context/ProductsContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cart, total, getTotal, fnCart } = useContext(CartContext)
  const { isAuthenticated, fnIsAuthenticated, getUserData } = useContext(UserContext)
  const { products } = useContext(ProductsContext)

  const navigate = useNavigate()

  useEffect(() => {
    getTotal()
  }, [cart])

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
      getUserData()
    } else {
      navigate('/register')
    }
  }, [isAuthenticated])

  useEffect(() => {
    const newCart = cart.filter((item) => products.some((product) => product.id === item.id))
    fnCart(newCart)
  }, [])

  return (
    <Container fluid className='px-5 py-5'>
      <Container className='w-75 px-4 pb-5 cart-container'>
        <h2 className='mt-4 mb-3 text-center title-name'>Mi Carrito</h2>
        {cart.length > 0
          ? <Row className='justify-content-center gy-3'>
            {cart.map((product) => (
              <Col key={product.id} xs={12}>
                <CartCard product={product} />
              </Col>
            ))}
            <Col xs={12} className='d-flex justify-content-between align-items-center px-5 py-2 fw-bold'>
              <p className='fs-3'>Total</p>
              <p className='text-end fs-3'>${total.toLocaleString('es-CL')}</p>
            </Col>
            <Col xs={12} className='text-center'>
              <Button variant='primary' size='lg' onClick={() => navigate('/payment')}>Proceder con la compra</Button>
            </Col>
          </Row>
          : <Container>
            <h3 className='text-center'>Tu carrito está vacío</h3>
          </Container>}
      </Container>
    </Container>
  )
}

export default Cart
