import multer from "multer";
import express from 'express'
import { checkAuth, getUserById, UserLogin, UserRegister } from "../Controllers/UserControl.js";

const UserRouter = express.Router()

const storage = multer.diskStorage({
    destination:"uploaded_files",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

UserRouter.post("/register",upload.single("image"),UserRegister)
UserRouter.post("/login",UserLogin)
UserRouter.get("/checkauth",checkAuth)
UserRouter.get("/getuser/:userID",getUserById)

export default UserRouter