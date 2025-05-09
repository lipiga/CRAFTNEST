import ProductModel from "../Models/ProductModel.js";
import CartModel from "../Models/CartModel.js";

//add to cart
const AddCart = async(req,res)=>{
    const {product_id, user_id, quantity,image,name,seller_id,product_detail} = req.body
    try {
        const product = await ProductModel.findById(product_id)
        const finalprice = product.price*Number(quantity)

        const cart = await CartModel.findOne({"user_id":user_id,"product_id":product_id})
        if(cart){
            await CartModel.findByIdAndUpdate(cart._id,{
                "quantity":cart.quantity+Number(quantity),
                "price":cart.price+(Number(quantity)*product.price)
            })
            res.json({ success: true, message: "updated cart successfully" })
            
        }else{
            const newCart = new CartModel({
                product_id: product_id,
                user_id: user_id,
                quantity: Number(quantity),
                price: finalprice,
                image:image,
                name:name,
                seller_id:seller_id,
                product_detail:product_detail
            })
            await newCart.save()
            res.json({ success: true, message: "added to cart successfully" })
        }
        
            
            
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
const GetCart = async(req,res)=>{
    const { user_id } = req.headers
    const cartItems = await CartModel.find({ "user_id": user_id })
    res.json({ success: true, data: cartItems })
}
const DeleteCart = async(req,res)=>{
    await CartModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Item deleted from cart successfully"})
}

export {AddCart,DeleteCart,GetCart}