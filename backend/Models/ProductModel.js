import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    seller_id : {type:String,required:true},
    name:{type:String, required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String, required:true},
    stock:{type:String,required:true},
    product_detail:{type:String,required:true}
})

const ProductModel = mongoose.models.product || mongoose.model("product",ProductSchema)

export default ProductModel