import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import UserLogin from '../UserLogin/UserLogin';
import { toast } from 'react-toastify';
import './ProductView.css';
import Footer from '../Footer/Footer';
import Products from '../Products/Proucts';
import { ToastContainer } from 'react-toastify';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showUserlogin, setShowuserlogin] = useState(false);
  const [userType, setUsertype] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(localStorage.getItem('userid') || null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/product/fetchproduct/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
    fetchReviews(); 
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/review/getreview/${id}`);
      if (response.data.success) {
        // Fetch user details for each review
        const reviewsWithUserData = await Promise.all(
          response.data.data.map(async (review) => {
            const userResponse = await axios.get(`http://localhost:4000/api/user/getuser/${review.userId}`);
            return {
              ...review,
              user: userResponse.data.data
            };
          })
        );
        setReviews(reviewsWithUserData);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(Number(e.target.value), product.stock));
    setQuantity(value);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!userId) {
      setShowuserlogin(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/cart/addtocart", {
        user_id: userId,
        quantity: quantity,
        product_id: product._id,
        name: product.name,
        image: product.image,
        seller_id: product.seller_id,
        product_detail: product.product_detail,
        price: product.price
      });

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!userId) {
      setShowuserlogin(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/review/addreview", {
        userId: userId,
        productId: id,
        review: newReview
      });

      if (response.data.success) {
        toast.success("Review added successfully");
        setNewReview("");
        setShowReviewForm(false);
        fetchReviews(); // Refresh reviews
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    }
  };

  return (
    <div className="product-view">
      <ToastContainer />
      <Navbar setShowuserlogin={setShowuserlogin} setUsertype={setUsertype} />
      {showUserlogin && <UserLogin setShowuserlogin={setShowuserlogin} setUsertype={setUsertype} userType={userType} />}
      
      <main className="product-view__main">
        {product ? (
          <>
            <div className="product-view__card">
              <div className="product-view__image-container">
                <img 
                  src={"http://localhost:4000/images/" + product.image} 
                  alt={product.name} 
                  className="product-view__image"
                />
              </div>
              
              <div className="product-view__info">
                <h1 className="product-view__title">{product.name}</h1>
                <p className="product-view__price">₹{product.price}</p>
                
                <div className="product-view__meta">
                  <span className="product-view__category">{product.category}</span>
                  <span className={`product-view__stock ${product.stock > 0 ? 'product-view__stock--in' : 'product-view__stock--out'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>
                
                <p className="product-view__description">{product.product_detail}</p>
                
                <form onSubmit={handleAddToCart} className="product-view__cart-form">
                  <div className="product-view__quantity-control">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="product-view__quantity-input"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="product-view__cart-btn"
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </form>
              </div>
            </div>

            <div className="product-reviews">
              <div className="reviews-header">
                <h2>Product Reviews</h2>
                {userId && (
                  <button 
                    className="add-review-btn"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Cancel' : 'Add Review'}
                  </button>
                )}
              </div>

              {showReviewForm && (
                <form onSubmit={handleAddReview} className="review-form">
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review here..."
                    required
                    className="review-textarea"
                  />
                  <button type="submit" className="submit-review-btn">
                    Submit Review
                  </button>
                </form>
              )}

              {reviews.length > 0 ? (
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review._id} className="review-item">
                      <div className="review-user">
                        <img 
                          src={"http://localhost:4000/images/" + (review.user.image)} 
                          alt={review.user?.name} 
                          className="review-user-avatar"
                        />
                        <span className="review-user-name">{review.user?.name}</span>
                      </div>
                      <div className="review-content">
                        <p>{review.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </>
        ) : (
          // <div className="product-view__loading">Loading...</div>
          <div className="product-view__loading">
  <img src="/src/assets/view_loading.png" alt="Loading..." />
</div>
        )}
      </main>
      <h2 className='related-products'>Related Products</h2>
      {product && <Products category={product.category} />}
    
    <Footer />
    </div>
  );
};

export default ProductView;