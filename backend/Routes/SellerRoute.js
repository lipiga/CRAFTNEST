import express from 'express'
import multer from 'multer'
import { GetSeller, SellerLogin, SellerRegister } from '../Controllers/SellerControl.js'

const SellerRouter = express.Router()

const storage = multer.diskStorage({
    destination:"uploaded_files",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

SellerRouter.post("/register",upload.single("image"),SellerRegister)
SellerRouter.post("/login",SellerLogin)
SellerRouter.get("/getseller",GetSeller)

export default SellerRouter