import UserModel from "../Models/UserModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import session from "express-session";

//seller registration
const UserRegister = async (req, res) => {
    let image_name = `${req.file.filename}`
    const { name, email, password, type } = req.body

    //email check
    try {
        const exist = await UserModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "User Already Exist" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a Valid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be 8 characters or above" })
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.json({
                success: false,
                message:
                    "Password must be at least 8 characters long, include one uppercase letter and one special character"
            });
        }


        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            name: name,
            password: hashpassword,
            email: email,
            image: image_name,
            type: type
        })

        const user = await newUser.save()
        const userId = user._id
        res.json({ success: true, userId, message: "Register Successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Can't Enter a Seller" })
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" })
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) {
            return res.json({ success: false, message: "Incorrect Password" })
        }

        const userId = user._id
        const type = user.type
        // req.session.isAuth = true
        res.json({ success: true, data: user, type, userId, message: "Login successfully" })
    } catch (error) {
        console.log(error)
    }

}

const checkAuth = (req, res) => {
    if (req.session.isAuth) {
        res.json({ isAuth: true })
    } else {
        res.json({ isAuth: false })
    }
}

const getUserById = async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await UserModel.findById(userID);

        return res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "can't get user" });
    }
}



export { UserLogin, UserRegister, checkAuth, getUserById };