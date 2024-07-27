import './Navigation.css'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/img/logo-pink.png'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { ProductsContext } from '../../context/ProductsContext'

const cartLogo = <FontAwesomeIcon icon={faCartShopping} size='xl' />

const Navigation = () => {
  const [search, setSearch] = useState('')

  const { cart } = useContext(CartContext)
  const { products, getProducts } = useContext(ProductsContext)

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (search === '') {
      getProducts()
    } else {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      setFilter(filteredProducts)
    }
  }, [search])

  const quantity = cart.map((product) => (
    product.qty
  ))
  const cantidad = quantity.reduce((acc, item) => acc + item, 0)
  return (
    <>
      <Navbar expand='lg' className='navbg'>
        <Container fluid className='mainContainer'>
          <Container className='firstContainer'>
            <Navbar.Brand>
              <NavLink to='/'>
                <img src={logo} className='logo-img' />
              </NavLink>
            </Navbar.Brand>
          </Container>
          <Container className='secondContainer'>
            <Navbar.Toggle aria-controls='navbarScroll' />
            <div id='navbarScroll'>
              <Form className='d-flex w-100'>
                <Form.Control type='text' placeholder='Busca un producto' className='mr-sm-2 me-sm-2 w-100' aria-label='Search' value={search} onChange={handleSearch} />
                <Button className='search-btn' bsPrefix='custom-btn' type='submit'>Buscar</Button>
              </Form>
              <Nav className='linksContainer me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                <NavLink to='/' className='navlinks'>Inicio</NavLink>
                <NavDropdown title='Categorias' id='navbarScrollingDropdown'>
                  <NavDropdown.Item to='#action3' className='navdropitem'>Juegos de Mesa</NavDropdown.Item>
                  <NavDropdown.Item to='#action4' className='navdropitem'>TCG</NavDropdown.Item>
                  <NavDropdown.Item to='#action5' className='navdropitem'>Figuras Coleccionables</NavDropdown.Item>
                  <NavDropdown.Item to='#action5' className='navdropitem'>Mangas y Cómics</NavDropdown.Item>
                  <NavDropdown.Item to='#action5' className='navdropitem'>Álbumes y Láminas</NavDropdown.Item>
                </NavDropdown>
                <NavLink to='/about-us' className='navlinks'>Sobre Nosotros</NavLink>
                <NavLink to='/contact' className='navlinks'>Contacto</NavLink>
                <NavLink to='/help' className='navlinks'>Ayuda</NavLink>
              </Nav>
            </div>
          </Container>
          <Container className='thirdContainer'>
            <NavLink to='/register' className='navlinks'>Registrar</NavLink>
            <NavLink to='/login' className='navlinks'>Iniciar Sesión</NavLink>
            <NavLink to='/cart' className='cart'>{cantidad > 0 ? cantidad : ''}{cartLogo}</NavLink>
          </Container>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
