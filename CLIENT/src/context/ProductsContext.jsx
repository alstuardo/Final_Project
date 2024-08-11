import { createContext, useEffect, useState, useContext } from 'react'
import { UserContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { URLBASE } from '../config/constants'

export const ProductsContext = createContext()

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState(products)
  const [liked, setLiked] = useState([])

  const { isAuthenticated, activeUser } = useContext(UserContext)
  const userId = activeUser.id
  console.log(userId)
  const navigate = useNavigate()

  const getProducts = () => {
    axios.get(`${URLBASE}/catalogue`)
      .then((response) => {
        setProducts(response.data.message)
      })
  }

  const getFavorites = async (userId) => {
    if (userId) {
      const token = window.sessionStorage.getItem('token')
      const response = await axios.get(`${URLBASE}/favorites/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
      setLiked(response.data.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getFavorites(userId)
  }, [])

  const toggleLike = async (userId, productId) => {
    if (isAuthenticated) {
      const token = window.sessionStorage.getItem('token')
      await axios.post(`${URLBASE}/favorites/${userId}`, { productId }, { headers: { Authorization: `Bearer ${token}` } })
    } else {
      navigate('/register')
    }
  }

  const removeLike = async (userId, productId) => {
    if (isAuthenticated) {
      const token = window.sessionStorage.getItem('token')
      await axios.delete(`${URLBASE}/favorites/${userId}`, { data: { productId }, headers: { Authorization: `Bearer ${token}` } })
    } else {
      navigate('/register')
    }
    getFavorites(userId)
  }

  const createProduct = () => {
    toast.info('Producto creado exitosamente', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    })
  }

  const fnProducts = (product) => setProducts(product)
  const fnFilterProducts = (product) => setFilterProducts(product)

  const globalState = { products, filterProducts, fnProducts, fnFilterProducts, getProducts, liked, toggleLike, removeLike, createProduct, getFavorites }

  return (
    <ProductsContext.Provider value={globalState}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
