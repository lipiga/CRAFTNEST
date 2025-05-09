import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import SellerPage from './Pages/SellerPage/SellerPage'
import SellerAddproducts from './Components/SellerAddproducts/SellerAddproducts'
import Cart from './Pages/Cart/Cart'
import Order from './Pages/Order/Order'
import SellerOrder from './Components/SellerOrder/SellerOrder'
import UserOrder from './Components/UserOrder/UserOrder'
import { ToastContainer } from 'react-toastify';
import EditProducts from './Components/EditProducts/EditProducts'
import 'react-toastify/dist/ReactToastify.css';
import ProductView from './Components/ProductView/ProductView'
import UserProfilePage from './Components/UserProfilePage/UserProfilePage'
import ProductsPage from './Pages/ProductsPage/ProductsPage'



const App = () => {
  
  
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/seller' element={<SellerPage />}/>
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/addproducts' element={<SellerAddproducts />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/order' element={<Order />}/>
        <Route path='/userorder' element={<UserOrder/>}/>
        <Route path='/sellerorder' element={<SellerOrder />}/>
        <Route path="/edit/:productId" element={<EditProducts />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
      </Routes>
      
      
    </div>
  )
}

export default App