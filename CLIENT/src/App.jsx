import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Cart, Catalogue, Favorites, Home, Login, MyProducts, Payment, ProductDetails, Profile, Register, NotFound, AboutUs, Help, Contact } from './views/indexViews.js'
import Navigation from './components/navigation/Navigation.jsx'
import ProductsContextProvider from './context/ProductsContext.jsx'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ProductsContextProvider>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/myproducts' element={<MyProducts />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/catalogue' element={<Catalogue />} />
            <Route path='/product-details' element={<ProductDetails />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/help' element={<Help />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </ProductsContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
