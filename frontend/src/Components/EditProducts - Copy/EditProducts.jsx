import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EditProducts.css'
import SellerHeader from '../Seller/SellerHeader'


const EditProducts = () => {

    const productid = localStorage.getItem("productid")
    const [details,setDetails] = useState([])
    const [image,setImage] = useState(false)
    
    const navigate = useNavigate()

    const GetProduct = async () => {
        const response = await axios.get("http://localhost:4000/api/product/fetchproduct",{headers:{product_id:productid}})
        if (response.data.success) {
            setDetails(response.data.data)
        }
    }
    GetProduct();
    const [product,setProduct] = useState({
        name:"",
        product_detail:"",
        price:"",
        stock:""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.defaultValue
        const value2 = event.target.value

        
        setProduct(product=>({...product,[name]:value2}))
        console.log(product)
        
    }

    const onSubmit = async () => {
        const form = new FormData();
        form.append("product_id",productid)
        product.name === '' ? form.append("name", details.name) : form.append("name", product.name);
        product.product_detail === '' ? form.append("product_detail", details.product_detail) : form.append("product_detail", product.product_detail);
        product.price === '' ? form.append("price", Number(details.price)) : form.append("price", Number(product.price))
        product.stock === '' ? form.append("stock", details.stock) : form.append("stock", product.stock)
        form.append("image",image);

        const respond = await axios.post("http://localhost:4000/api/product/updateproduct",form);
        if (respond.data.success) {
            alert(respond.data.message)
            navigate('/seller')
        }
    }
    
    
    
  return (
    <div>
    <SellerHeader />
        <form className="form-container" onSubmit = {onSubmit}>
        <p>Edit Product Details</p>
            <input className="input-tag" onChange={onChangeHandler} type='text' name='name' required defaultValue={details.name} />
            <textarea onChange={onChangeHandler} rows={3} name='product_detail' required defaultValue={details.product_detail} />
            <input className="input-tag" onChange={onChangeHandler} type='number' name='price' required defaultValue={details.price} />
            <input className="input-tag" onChange={onChangeHandler} type='number' name='stock' required defaultValue={details.stock} />
            <input className="input-tag" onChange={(event)=>setImage(event.target.files[0])} type='file' name='image' required />
            <button className="input-tag" type='submit' >submit</button>
        </form>
    </div>
  )
}

export default EditProducts