import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Products from '../../Components/Products/Proucts'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import './ProductsPage.css'

const ProductsPage = ({ setShowuserlogin, setUsertype }) => {
  const [category, setCategory] = useState("All")
  const navigate = useNavigate()

  return (
    <div>
      <ToastContainer />
      <Navbar setShowuserlogin={setShowuserlogin} setUsertype={setUsertype} />
      
      <div className="products-page-container">
        <h1 className="products-page-title">Our Products</h1>
        <ExploreMenu category={category} setCategory={setCategory} />
        
        {/* Products component without limit prop to show all products */}
        <Products category={category} />
      </div>
      
      <Footer />
    </div>
  )
}

export default ProductsPage
