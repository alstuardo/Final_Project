import './Header.css'
import Carousel from 'react-bootstrap/Carousel'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'

import categoriesData from '../../assets/data/categories.js'

const Header = () => {
  const { products, fnFilterProducts } = useContext(ProductsContext)
  const navigate = useNavigate()

  const handleFilterLink = (e) => {
    const result = products.filter((product) => product.category.toLowerCase().includes(e.target.name.toLowerCase()))
    fnFilterProducts(result)
    navigate('/catalogue')
    e.preventDefault()
  }

  return (
    <div className='header-carousel'>
      <Carousel fade>
        {categoriesData.map((category) => (
          <Carousel.Item interval={1500} key={category.name}>
            <img className='slide-img' src={category.img} alt='img1' name={category.name} onClick={handleFilterLink} />
            <Carousel.Caption>
              <div className='caption'>
                <h3>{category.name}</h3>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        {/* <Carousel.Item interval={1500}>
          <img className='slide-img' src={catTCG} alt='img2' name='TCG' onClick={handleFilterLink} />
          <Carousel.Caption>
            <h3>TCG</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className='slide-img' src={catFigures} alt='img3' name='Figuras Coleccionables' onClick={handleFilterLink} />
          <Carousel.Caption>
            <h3>Figuras Coleccionables</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className='slide-img' src={catComics} alt='img4' name='Mangas y Cómics' onClick={handleFilterLink} />
          <Carousel.Caption>
            <h3>Mangas y Cómics</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className='slide-img' src={catAlbums} alt='img5' name='Álbumes y Láminas' onClick={handleFilterLink} />
          <Carousel.Caption>
            <h3>Álbumes y Láminas</h3>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    </div>
  )
}

export default Header
