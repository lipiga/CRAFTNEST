import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user_id:{type:String,required:true},
    product_id:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    image:{type:String,required:true},
    name:{type:String,required:true},
    seller_id:{type:String,required:true},
    product_detail:{type:String,required:true}
})

const CartModel = mongoose.models.cart || mongoose.model("cart",CartSchema)

export default CartModel