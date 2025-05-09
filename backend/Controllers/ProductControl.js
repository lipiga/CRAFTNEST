import mongoose from "mongoose";
import ProductModel from "../Models/ProductModel.js";
import fs from 'fs'

//product add

const AddProduct = async (req,res) => {
    const image_name = `${req.file.filename}`
    const {name,price,category,stock,product_detail,seller_id}= req.body

    try {
        const newProduct = new ProductModel({
            name:name,
            seller_id:seller_id,
            price:price,
            category:category,
            stock:stock,
            product_detail:product_detail,
            image:image_name
        })
        const product = await newProduct.save()
        res.json({success:true,message:"product added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}


const ProductList = async (req, res) => {
    const products = await ProductModel.find({});
    res.json({success:true,data:products});
}

const listProduct = async (req,res) =>{
    console.log("Received a request at /api/product/listproduct");
    try {
        const foods = await ProductModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


const DeleteProduct = async(req,res) =>{
    const product = await ProductModel.findById(req.body.id)
    fs.unlink(`uploaded_files/${product.image}`,()=>{})

    await ProductModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product deleted"})
}

const GetSellerProduct = async (req, res) => {
    const { seller_id } = req.body
    const getProducts = await ProductModel.find({ "seller_id": seller_id })
    return res.json({ success: true, data: getProducts })
}

// const GetProductById = async (req,res)=>{
//     const {product_id} = req.body
//     const fetchProduct = await ProductModel.findById(product_id);
//     res.json({success:true,data:fetchProduct})
// }

const GetProductById = async (req, res) => {
    try {   
        const { product_id } = req.params;

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required."
            });
        }

        const product = await ProductModel.findById(product_id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the product.",
            error: error.message
        });
    }
};



const UpdateProduct = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            price: Number(req.body.price),
            category: req.body.category,
            product_detail: req.body.product_detail,
            stock: Number(req.body.stock)
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const product = await ProductModel.findByIdAndUpdate(
            req.body.product_id,
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; 



export {AddProduct,ProductList,DeleteProduct,GetSellerProduct,GetProductById,UpdateProduct,listProduct}