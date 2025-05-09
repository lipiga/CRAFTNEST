import SellerModel from "../Models/SellerModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

//seller registration
const SellerRegister = async (req,res) => {
    let image_name = `${req.file.filename}`
    const {name,email,password} = req.body

    //email check
    try {
        const exist = await SellerModel.findOne({email})
        if(exist){
            res.json({success:false,message:"Seller Already Exist"})
        }

        if(!validator.isEmail(email)){
            res.json({success:false, message:"Please enter a Valid Email"})
        }

        if(password.length<8){
            res.json({success:false, message:"Password should be 8 characters or above"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)

        const newSeller = new SellerModel({
            name:name,
            password:hashpassword,
            email:email,
            image:image_name
        })

        const seller = await newSeller.save()
        const sellerId = seller._id
        res.json({success:true, sellerId ,message:"Register Successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Can't Enter a Seller"})
    }
}

const SellerLogin = async (req,res) => {
    const {email,password} = req.body

    try {
        const seller = await SellerModel.findOne({ email })

        if (!seller) {
            res.json({ success: false, message: "Seller Doesn't Exist" })
        }

        const passMatch = await bcrypt.compare(password, seller.password)
        if (!passMatch) {
            res.json({ success: false, message: "Incorrect Password" })
        }
        
        const sellerId = seller._id
        res.json({success:true,sellerId,data:seller,message:"Login successfully"})
    } catch (error) {
        
    }

}

const GetSeller = async (req, res) => {
    const seller_id = req.body.id
    const getSeller = await SellerModel.find({ "_id": seller_id })
    res.json({ success: true, data: getSeller })
}

export {SellerLogin, SellerRegister,GetSeller}