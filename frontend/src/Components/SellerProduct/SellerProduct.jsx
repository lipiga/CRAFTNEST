import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './SellerProduct.css'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

const SellerProduct = () => {

  const sellerid = localStorage.getItem("sellerid")
  const [product, setProduct] = useState([])
  const navigate = useNavigate()

  const fetchSellerProducts = async () => {

    const response = await axios.post("http://localhost:4000/api/product/getsellerproduct", {
      'seller_id': sellerid
    });
    console.log(sellerid);
    if (response.data.success) {
      setProduct(response.data.data)
    } else {
      console.log("error");
    }
  }

  const deleteProduct = async (itemId) => {
    const response = await axios.post("http://localhost:4000/api/product/deleteproduct", { id: itemId })
    if (response.data.success) {
      // alert(response.data.message)
      toast.success(response.data.message)
      fetchSellerProducts();
    }
  }


  useEffect(() => {
    fetchSellerProducts(); // ✅ Only runs once on component mount
  }, []);

  return (
    <div className='product-grid'>
      {product.map((item, index) => {
        const key = item._id ? item._id : `product-${index}`;
        return (
          <div key={key} className='product-card'>
            <div className='product-actions'>
              <p className='product-delete' onClick={() => deleteProduct(item._id)}>X</p>
              <FaEdit
                onClick={() => navigate(`/edit/${item._id}`)}
                className='product-edit'
              />
            </div>

            <div className='seller-product-image-container'>
              <img
                src={"http://localhost:4000/images/" + item.image}
                className='seller-product-image'
                alt={item.name}
              />
            </div>

            <div className='product-details'>
              <div className='product-text'>
                <h1 className='product-title'>{item.name}</h1>
                <p className='product-description'>{item.product_detail}</p>
              </div>

              <div className='product-footer'>
                <p className='product-price'>₹<span>{item.price}</span></p>
                <p className='product-stock'>Stock: {item.stock}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SellerProduct
