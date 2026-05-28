import './Catalogue.css'
import { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { ProductsContext } from '../../context/ProductsContext'
import { UserContext } from '../../context/UserContext'
import LikeButton from '../../components/likeButton/LikeButton'
import { Badge, Dropdown } from 'react-bootstrap'

const Catalogue = () => {
  const { products, getProducts } = useContext(ProductsContext)
  const { activeUser, fnIsAuthenticated, isAuthenticated, getUserData } = useContext(UserContext)
  const userId = activeUser.id
  const [sortBy, setSortBy] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category')
  const searchQuery = queryParams.get('searchQuery')

  const filterStore = (sortBy) => {
    let result

    if (category) {
      result = products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      )
    } else if (searchQuery) {
      result = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else {
      result = [...products]
    }

    if (sortBy === 'asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'ascName') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'descName') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    return result
  }

  const filteredProducts = filterStore(sortBy)

  const handleFilterLink = (e) => {
    e.preventDefault()
    navigate(`/catalogue/?category=${e.target.name}`)
  }

  const handleCatalogue = (products) => {
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {})

    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count
    }))
  }

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
      getUserData()
    }
  }, [isAuthenticated])

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className='grid-container'>
        <aside>
          <h3>Categorías</h3>
          {
            handleCatalogue(products).map(({ category, count }) => (
              <article className='category' key={category}>
                <p><NavLink name={category} onClick={handleFilterLink}>{category}:<span className='cantidad'>({count})</span></NavLink></p>
              </article>
            ))
          }
        </aside>

        <Dropdown className='d-flex'>
          <Dropdown.Toggle id='dropdown-autoclose-true'>
            Filtro
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortBy('asc')}>Precio de menor a mayor</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy('desc')}>Precio de mayor a menor</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy('ascName')}>Alfabético de A-Z</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy('descName')}>Alfabético de Z-A</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className='gallery grid-columns-5 p-3'>
          {filteredProducts.map(({ id, liked, image_url: imageUrl, title, price }) => (
            <div key={id}>
              <div className='cardCatalogue'>
                <div className='likeBtn'>
                  <LikeButton userId={userId} productId={id} />
                </div>
                <div onClick={() => navigate(`/product-details/${id}`)} style={{ backgroundImage: `url(${imageUrl})` }} className='productCard'>
                  <p>{title}</p>
                  <h6><Badge bg='dark'>Precio: ${(price).toLocaleString('es-CL')}</Badge></h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Catalogue
