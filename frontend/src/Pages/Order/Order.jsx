import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../Components/Navbar'
import './Order.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Order = () => {
    const userid = localStorage.getItem("userid")
    const [product,setProduct] = useState([])
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const [data, setData] = useState({
        user_id: userid,
        username:"",
        phone:"",
        doorno: "",
        street: "",
        area: "",
        district: "",
        state: "",
        pincode: "",
        product: [],
        amount: 0,
        paymentMethod: "Cash on Delivery" // Default payment method
    })
    

    const fetchCart = async () => {
      const response = await axios.get("http://localhost:4000/api/cart/get", { 
          headers: { 'user_id': userid } 
      });
      
      if (response.data.success) {
          // Add status to each product
          const productsWithStatus = response.data.data.map(product => ({
              ...product,
              status: "In Progress",
              payment: false
          }));
          
          setData(data => ({ 
              ...data, 
              product: productsWithStatus 
          }));
          
          setData(data => ({ 
              ...data, 
              amount: data.product.reduce((amount, item) => amount + item.price, 0) 
          }));
      }
    }

    useEffect(() => {
        fetchCart();
    }, []);
    
    const onchangehandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({...data, [name]: value}))
    }

    const onsubmit = async (e) => {
      e.preventDefault();
      
      try {
          // Update payment status for each product
          const updatedProducts = data.product.map(product => ({
              ...product,
              payment: data.paymentMethod === "Online Payment",
              paymentMethod: data.paymentMethod
          }));
  
          const orderData = {
              ...data,
              product: updatedProducts
          };
  
          const response = await axios.post(
              "http://localhost:4000/api/order/placeorder", 
              orderData
          );
  
          if (response.data.success) {
              // Case 1: Cash on Delivery → Proceed normally
              if (data.paymentMethod === "Cash on Delivery") {
                  setData({
                      user_id: userid,
                      username: "",
                      phone: "",
                      doorno: "",
                      street: "",
                      area: "",
                      district: "",
                      state: "",
                      pincode: "",
                      product: [],
                      paymentMethod: "Cash on Delivery"
                  });
                  toast.success(response.data.message);
                  navigate('/userorder');
              }
              // Case 2: Online Payment → Redirect to Stripe
              else if (data.paymentMethod === "Online Payment" && response.data.stripeUrl) {
                  window.location.href = response.data.stripeUrl; // Redirect to Stripe
              }
          }
      } catch (error) {
          toast.error("Failed to process order!");
          console.error("Order submission error:", error);
      }
  };

    return (
        <div className='order-page'>
          <ToastContainer />
          <Navbar />
          <div className='order-form-container'>
            <form className='order-form' onSubmit={onsubmit}>
              <h1 className='order-form-title'>Enter Details Here</h1>
              
              <div className='order-form-grid'>
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='username' 
                    value={data.username} 
                    type='text' 
                    placeholder='Enter Name' 
                    required 
                  />
                </div>
                
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='phone' 
                    value={data.phone} 
                    type='text' 
                    placeholder='Enter Phone Number' 
                    required 
                  />
                </div>
                
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='doorno' 
                    value={data.doorno} 
                    type='text' 
                    placeholder='Enter Door Number' 
                    required 
                  />
                </div>
                
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='street' 
                    value={data.street} 
                    type='text' 
                    placeholder='Enter Street Name' 
                    required 
                  />
                </div>
                
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='area' 
                    value={data.area} 
                    type='text' 
                    placeholder='Enter Area Name' 
                    required 
                  />
                </div>
                
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='district' 
                    value={data.district} 
                    type='text' 
                    placeholder='Enter District' 
                    required 
                  />
                </div>
                
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='state' 
                    value={data.state} 
                    type='text' 
                    placeholder='Enter State' 
                    required 
                  />
                </div>
                
                <div className='order-input-group'>
                  <input 
                    className='order-input' 
                    onChange={onchangehandler} 
                    name='pincode' 
                    value={data.pincode} 
                    type='text' 
                    placeholder='Enter Pincode' 
                    required 
                  />
                </div>

                <div className='order-input-group'>
                  <select
                    className='order-input'
                    onChange={onchangehandler}
                    name='paymentMethod'
                    value={data.paymentMethod}
                    required
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Online Payment">Online Payment</option>
                  </select>
                </div>
              </div>
              
              <button type='submit' className='order-submit-btn'>Place Order</button>
            </form>
          </div>
        </div>
    )
}

export default Order