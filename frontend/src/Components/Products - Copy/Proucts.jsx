import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Products.css'
import { toast } from 'react-toastify';
const Proucts = () => {

    const [product,setProduct] = useState([])
    const userid = localStorage.getItem("userid")
    const [quantity,setQuantity] = useState({
        user_id:userid,
        quantity:"",
        product_id:"",
        image:"",
        name:"",
        seller_id:"",
        product_detail:""
    })
    

    const onchangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setQuantity(quantity=>({...quantity,[name]:value}))
    }

    const onsubmit = async (e)=> {
        e.preventDefault()
        const response = await axios.post("http://localhost:4000/api/cart/addtocart",quantity)
        if(response.data.success){
            toast.success(response.data.message)
        }
    }

    const fetchProducts = async()=>{
        const response = await axios.post("http://localhost:4000/api/product/listproduct")
        if(response.data.success){
            setProduct(response.data.data)
        }
    }
    fetchProducts()
  return (
    
    <div className='list-product'>
        
        {product.map((item,index)=>{
            return (
                <div key={index} className='wrapper'>
                    <div className='product-container'>
                        <img src={"http://localhost:4000/images/"+item.image} />
                        <h1 className='product-name'>{item.name}</h1>
                        {item.stock>10? <p className='high'>Stock: {item.stock}</p>: <p className='low'>Only {item.stock} left!</p>}
                        <h4 className='price'>₹{item.price}</h4>
                        <form className='productCard' onSubmit={onsubmit}>
                            <input onChange={onchangeHandler} value={quantity.quantity} className='input-field' placeholder='0' type='number' name='quantity' />
                            <button type='submit' onClick={() => setQuantity(quantity => ({ ...quantity, product_id: item._id,name:item.name,image:item.image,seller_id:item.seller_id,product_detail:item.product_detail }))}  className='addtocart'>Add to Cart</button>
                        </form>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Proucts