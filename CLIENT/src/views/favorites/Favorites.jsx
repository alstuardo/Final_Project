import './Favorites.css'
import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import Liked from '../../components/Liked/Liked'

const Favorites = () => {
  const { liked } = useContext(ProductsContext)
  return (
    <>
      <div className='Fav'>
        <h1>Productos favoritos</h1>
        {liked.length ? <Liked /> : <div><h3>Agrega tus productos favoritos</h3><img src='https://i.pinimg.com/originals/8f/6a/2b/8f6a2bf112d267932b31004311d8fc85.gif' alt='sin favoritos' /></div>}
      </div>
    </>
  )
}
export default Favorites
