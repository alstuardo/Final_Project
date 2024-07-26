import { Container, Col, Row, Image, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../context/CartContext'
import { useContext, useEffect } from 'react'

const trashLogo = <FontAwesomeIcon icon={faTrash} size='xl' />

const CartCard = ({ product }) => {
  const { cart, addToCart, removeFromCart, removeItemFromCart, getTotal } = useContext(CartContext)

  useEffect(() => {
    getTotal()
  }, [cart])

  return (
    <Container className='border-bottom border-2'>
      <Row className='px-4 py-3'>
        <Col xs={12} md={4} className='p-0'>
          <Image rounded fluid className='p-0' src={`${product.image_url}`} />
        </Col>
        <Col xs={10} md={6} className='d-flex flex-column justify-content-between ps-4'>
          <div>
            <h2>{product.title}</h2>∫
            <p>{product.description}</p>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
            <div className='d-flex justify-content-center align-items-center text-center'>
              <Button onClick={() => removeFromCart(product)} variant='secondary'>-</Button>
              <p className='mx-2 mb-0'>{product.qty}</p>
              <Button onClick={() => addToCart(product)} variant='danger'>+</Button>
            </div>
          </div>
        </Col>
        <Col md={12} lg={2} className='d-flex flex-column justify-content-between align-items-end'>
          <i onClick={() => removeItemFromCart(product)} className='px-2'>{trashLogo}</i>
          <p className='m-0 py-2'>{product.price * product.qty}</p>
        </Col>
      </Row>
    </Container>
  )
}
export default CartCard
