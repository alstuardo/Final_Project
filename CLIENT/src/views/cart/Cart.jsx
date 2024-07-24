import './Cart.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CartCard from '../../components/cartCard/CartCard'
import { CartContext } from '../../context/CartContext'
import { useContext, useEffect } from 'react'

const Cart = () => {
  const { cart, total, getTotal } = useContext(CartContext)
  useEffect(() => {
    getTotal()
  }, [cart])

  return (
    <Container fluid className='px-5 py-5'>
      <Container className='w-50 px-4 pb-5 cart-container'>
        <h2 className='mt-4 mb-3 text-center title-name'>Mi Carrito</h2>
        <Row className='justify-content-center gy-3'>
          {cart.map((product) => (
            <Col key={product.id} xs={12}>
              <CartCard productId={product.id} title={product.title} description={product.description} qty={product.qty} price={product.price} imageUrl={product.image_url} />
            </Col>
          ))}
          <Col xs={12} className='d-flex justify-content-between align-items-center px-5 py-2 fw-bold'>
            <p>Subtotal</p>
            <p className='text-end'>${total}</p>
          </Col>
          <Col xs={12} className='text-center'>
            <Button variant='primary' size='lg'>Proceder con la compra</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Cart
