import React, { useContext } from 'react'
import Header from '../../Components/Header/Header'
import { useState } from 'react'
import Navbar from '../../Components/Navbar'
import UserLogin from '../../Components/UserLogin/UserLogin'
import Proucts from '../../Components/Products/Proucts'
import { ToastContainer } from 'react-toastify';
import Footer from '../../Components/Footer/Footer'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [showUserlogin, setShowuserlogin] = useState(false)
  const [userType, setUsertype] = useState("")
  const {cartcount} = useContext(StoreContext)
  const [category, setCategory] = useState("All")
  const [productsLimit, setProductsLimit] = useState(8) // Initial limit of 12 products
  const navigate = useNavigate()

  const handleLoadMore = () => {
    // Redirect to products page
    navigate('/products')
  }

  return (
    <div>
      <ToastContainer />
      <Navbar setShowuserlogin={setShowuserlogin} setUsertype={setUsertype} />
      {showUserlogin ? <UserLogin setShowuserlogin={setShowuserlogin} setUsertype={setUsertype} userType={userType} /> : <></>}
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <Proucts category={category} limit={8} />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button 
          onClick={handleLoadMore}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Load More
        </button>
      </div>
      <Footer />
      <p>{cartcount}</p>
    </div>
  )
}

export default Home