import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import './UserOrder.css'
import { ToastContainer } from 'react-toastify';
const UserOrder = () => {
    const userid = localStorage.getItem("userid")
    const [orderItem, setOrderitem] = useState([])
    const [orderstatus, setOrderstatus] = useState(false)
    const GetUserOrder = async () => {
        const response = await axios.get("https://craftnest-backend-v5ki.onrender.com/api/order/getuserorder", { headers: { 'user_id': userid } })
        if (response.data.success) {
            setOrderitem(response.data.data)
            setOrderstatus(true)
        } else {
            console.log("error")
        }
    }
    GetUserOrder();
    return (
        <div className='order-tracking-container'>
          <ToastContainer />
          <div className='order-navbar'>
            <Navbar />
          </div>
          
          <div className='order-content'>
            <div className='order-header'>
              <p>Image</p>
              <p>Name</p>
              <p>Quantity</p>
              <p>Price</p>
              <p>Status</p>
            </div>
            
            {orderItem.map((item, index) => (
              <div key={index}>
                {item.product.map((product, index) => (
                  <div className='order-item' key={index}>
                    <img 
                      src={"https://craftnest-backend-v5ki.onrender.com/images/" + product.image} 
                      className='product-image' 
                      alt={product.name} 
                    />
                    <p className='product-name'>{product.name}</p>
                    <p className='product-quantity'>{product.quantity}</p>
                    <p className='product-price'>₹{product.price}</p>
                    <div className='status-badge status-in-progress'>
                      {product.status || "Is Progress"}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )
}

export default UserOrder
