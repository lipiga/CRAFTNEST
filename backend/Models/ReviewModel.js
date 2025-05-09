import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    productId:{type:String, required:true},
    userId:{type:String,required:true},
    review:{type:String,required:true}
})

const ReviewModel = mongoose.models.review || mongoose.model("review",ReviewSchema)

export default ReviewModel