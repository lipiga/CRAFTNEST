import ReviewModel from "../Models/ReviewModel.js";

const addReview = async(req,res) => {
    const {productId,userId,review} = req.body;
    try{
        const newReview = new ReviewModel({
            productId:productId,
            userId:userId,
            review:review
        })
        const Review = await newReview.save();
        res.json({success:true,message:"Review Added"});
    }catch(error){
        console.log(error)
        res.json({ success: false, message: "Can't Add review" });
    }
}

const getReviewById = async(req,res) =>{
    const {productId} = req.params;
    try {
        const reviews = await ReviewModel.find({productId:productId});
        
        res.json({success:true,data:reviews});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"can't take reviews"});
        
    }
}

export {getReviewById, addReview}