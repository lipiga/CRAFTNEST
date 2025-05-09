import express from 'express';
import { getReviewById,addReview } from '../Controllers/ReviewController.js';

const ReviewRouter = express.Router();

ReviewRouter.post("/addreview",addReview);
ReviewRouter.get("/getreview/:productId",getReviewById);

export default ReviewRouter