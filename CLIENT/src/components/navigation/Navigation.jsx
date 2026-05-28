import './Navigation.css'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/img/logo-pink.png'
import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import { ProductsContext } from '../../context/ProductsContext'
import Swal from 'sweetalert2'

const cartLogo = <FontAwesomeIcon icon={faCartShopping} size='xl' />

const Navigation = () => {
  const [search, setSearch] = useState('')
  const { cart, fnCart } = useContext(CartContext)
  const { isAuthenticated, fnIsAuthenticated, fnActiveUser } = useContext(UserContext)
  const { products } = useContext(ProductsContext)

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const navigate = useNavigate()

  const handleFilter = (e) => {
    e.preventDefault()
    const searchQuery = search.toLowerCase()
    navigate(`/catalogue/?searchQuery=${searchQuery}`)
  }

  const handleFilterLink = (e) => {
    e.preventDefault()
    const category = e.target.name.toLowerCase()
    navigate(`/catalogue/?category=${category}`)
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem('token')
    fnIsAuthenticated(false)
    fnActiveUser({})
    fnCart([])
  }

  // Se comenta esta función para permitir que usuarios no autenticados vean el carrito

  // const toRegister = () => {
  //   Swal.fire({
  //     title: 'Para ver el carrito debes iniciar sesión o registrarte',
  //     showCancelButton: true,
  //     confirmButtonColor: '#756AB6',
  //     cancelButtonColor: '#E0AED0',
  //     confirmButtonText: 'Registrate',
  //     cancelButtonText: 'Quedarme aquí'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate('/register')
  //     }
  //   })
  // }

  const quantity = cart.map((product) => (
    product.qty
  ))
  const cantidad = quantity.reduce((acc, item) => acc + item, 0)

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    const newCart = cart.filter((item) => products.some((product) => product.id === item.id))
    fnCart(newCart)
  }, [products])

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
            <Form className='d-flex w-100' onSubmit={handleFilter}>
              <Form.Control type='text' placeholder='Busca un producto' className='mr-sm-2 me-sm-2 w-100' aria-label='Search' value={search} onChange={handleSearch} />
              <Button className='search-btn' bsPrefix='custom-btn' onClick={handleFilter}>Buscar</Button>
            </Form>
            <Navbar.Toggle className='my-2' aria-controls='navbarScroll' />
            <Navbar.Collapse id='navbarScroll'>
              <Nav className='linksContainer me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                <NavLink to='/' className='navlinks'>Inicio</NavLink>
                <NavLink to='/catalogue' className='navlinks'>Tienda</NavLink>
                <NavDropdown title='Categorias' id='navbarScrollingDropdown'>
                  <NavDropdown.Item as={Link} to='boardgames' className='navdropitem' name='Juegos de Mesa' onClick={handleFilterLink}>Juegos de Mesa</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='tcg' className='navdropitem' name='TCG' onClick={handleFilterLink}>TCG</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='figures&collectionable' className='navdropitem' name='Figuras Coleccionables' onClick={handleFilterLink}>Figuras Coleccionables</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='mangas&comics' className='navdropitem' name='Mangas y Cómics' onClick={handleFilterLink}>Mangas y Cómics</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='albums&laminas' className='navdropitem' name='Álbumes y Láminas' onClick={handleFilterLink}>Álbumes y Láminas</NavDropdown.Item>
                </NavDropdown>
                <NavLink to='/about-us' className='navlinks'>Sobre Nosotros</NavLink>
                {/* <NavLink to='https://chat.whatsapp.com/CGobfcrDWaKFOF8pRffIRI' target='_blank' className='navlinks'>Contacto</NavLink> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
          {isAuthenticated
            ? <Container className='thirdContainer'>
              <NavLink to='/profile' className='navlinks'>Perfil</NavLink>
              <NavLink to='/' className='navlinks' onClick={handleLogout}>Cerrar Sesión</NavLink>
              <NavLink to='/cart' className='cart'>{cantidad > 0 ? cantidad : ''}{cartLogo}</NavLink>
            </Container>
            : <Container className='thirdContainer'>
              <NavLink to='/register' className='navlinks'>Registrar</NavLink>
              <NavLink to='/login' className='navlinks'>Iniciar Sesión</NavLink>
              <NavLink to='/cart' className='cart'>{cantidad > 0 ? cantidad : ''}{cartLogo}</NavLink>
              {/* <NavLink className='cart' onClick={toRegister}>{cantidad > 0 ? cantidad : ''}{cartLogo}</NavLink> */}
            </Container>}
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
