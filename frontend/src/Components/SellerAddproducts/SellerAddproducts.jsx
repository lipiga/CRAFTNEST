import React, { useState } from 'react'
import axios from 'axios'
import './SellerAddproducts.css'
import SellerHeader from '../Seller/SellerHeader'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const SellerAddproducts = () => {
  const sellerId = localStorage.getItem("sellerid")
  const [image , setImage] = useState(false)
  const [product, setProduct] = useState({
    seller_id :sellerId,
    name :"",
    product_detail:"",
    price:"",
    category:"",
    stock:""
  })

  const onchangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value

    setProduct(product=>({...product,[name]:value}))
  }

  const onSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("name",product.name)
    formData.append("seller_id",product.seller_id)
    formData.append("stock",Number(product.stock))
    formData.append("price",Number(product.price))
    formData.append("category",product.category)
    formData.append("image",image)
    formData.append("product_detail",product.product_detail)

    console.log(formData)

    const response = await axios.post("https://craftnest-backend-v5ki.onrender.com/api/product/addproduct",formData)
    if(response.data.success){
      setProduct({
        name: "",
        product_detail: "",
        price: "",
        category:"",
        stock: ""
      })
      toast.success("Product Added");
      setImage(false)
    }
  }
  return (
    <div className='add'>
      <ToastContainer />
      <SellerHeader />
      <form className='form-container' onSubmit={onSubmit}>
        <p>Enter Product Details</p>
  
        <div className='form-group'>
          <label htmlFor='name'>Product Name</label>
          <input id='name' className='input-tag' onChange={onchangeHandler} value={product.name} placeholder='Enter Product Name' type='text' name='name' required />
        </div>
  
        <div className='form-group'>
          <label htmlFor='product_detail'>Product Details</label>
          <textarea id='product_detail' onChange={onchangeHandler} value={product.product_detail} rows={3} placeholder='Enter Product Details' name='product_detail' required />
        </div>
  
        <div className='form-group'>
          <label htmlFor='price'>Product Price</label>
          <input id='price' className='input-tag' onChange={onchangeHandler} value={product.price} placeholder='Enter Product Price' type='number' name='price' required />
        </div>
  
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' onChange={onchangeHandler} name='category'>
            <option value='Crochet'>Crochet</option>
            <option value='ClayArt'>ClayArt</option>
            <option value='Resin'>Resin</option>
            <option value='Candle'>Candle</option>
            <option value='Soap'>Soap</option>
            <option value='SilkThread'>SilkThread</option>
            <option value='Embroidery'>Embroidery</option>
            <option value='Others'>Others</option>
          </select>
        </div>
  
        <div className='form-group'>
          <label htmlFor='stock'>Stock</label>
          <input id='stock' className='input-tag' onChange={onchangeHandler} value={product.stock} placeholder='Enter Number of Stock' type='number' name='stock' required />
        </div>
  
        <div className='form-group'>
          <label htmlFor='image'>Product Image</label>
          <input id='image' className='input-tag' onChange={(e) => setImage(e.target.files[0])} type='file' name='image' required />
        </div>
  
        <button type='submit'>Add</button>
      </form>
    </div>
  )
  
}

export default SellerAddproducts
