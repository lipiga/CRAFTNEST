import mongoose, { mongo } from "mongoose";

const SellerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,required:true}

})

const SellerModel = mongoose.models.seller || mongoose.model("seller",SellerSchema)

export default SellerModel