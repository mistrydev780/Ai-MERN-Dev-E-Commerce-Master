import User from "../model/userModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs'
import { gneratetoken, gneratetoken1 } from "../config/token.js";

export const Register = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        if(!validator.isEmail(email)){
             return res.status(400).json({message:"Enter valid Email"})
        }
        if(password.length < 8){
             return res.status(400).json({message:"Enter Strong Password"})
        }
        let hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashPassword
        })
        let token =  gneratetoken(user._id)
    res.cookie("token", token, {

    httpOnly: true,

    secure: true,

    sameSite: "none",

    path: "/",

    maxAge: 7 * 24 * 60 * 60 * 1000
})

        return res.status(201).json(user,token)

    } catch (error) {
   
         return res.status(400).json({message:`registration error ${error}`})
    }
}


export const login = async (req,res)=>{
    try {
        let {email,password} = req.body
        let user = await User.findOne({email})
        if(!user){
         return res.status(400).json({message:"User is not found"})
        }
        let isMath = await bcrypt.compare(password,user.password)
        if(!isMath){
         return res.status(400).json({message:"Incorrect Password"})
        }
        let token =  gneratetoken(user._id)
   res.cookie("token", token, {

    httpOnly: true,

    secure: true,

    sameSite: "none",

    path: "/",

    maxAge: 7 * 24 * 60 * 60 * 1000
})
        return res.status(201).json(user)
    } catch (error) {
         return res.status(400).json({message:`Login error ${error}`})
        
    }
}

export const logOut = async (req,res) =>{
    try {
        res.clearCookie("token")
         return res.status(200).json({message:"LogOut Succefully.."})
    } catch (error) {
         return res.status(400).json({message:`LogOut error ${error}`})
        
    }
}


export const googleLogin = async (req, res) => {

  try {

    const { name, email } = req.body

    if (!name || !email) {

      return res.status(400).json({
        message: "Name and Email required"
      })
    }

    let user = await User.findOne({ email })

    if (!user) {

      user = await User.create({

        name,
        email,
        password: "GOOGLE_AUTH"
      })
    }

    const token =  gneratetoken(user._id)

    console.log("GENERATED TOKEN => ", token)

   res.cookie("token", token, {

    httpOnly: true,

    secure: true,

    sameSite: "none",

    path: "/",

    maxAge: 7 * 24 * 60 * 60 * 1000
})

    return res.status(200).json({

      success: true,

      user
    })

  } catch (error) {

    console.log("Google Login Error => ", error)

    return res.status(500).json({

      success: false,

      message: "Google Login Failed"
    })
  }
}


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // ✅ AWAIT LAGAO
      const token =  gneratetoken(email);
res.cookie("token", token, {

    httpOnly: true,

    secure: true,

    sameSite: "none",

    path: "/",

    maxAge: 7 * 24 * 60 * 60 * 1000
})

      return res.status(200).json({ message: "Admin login success" });
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("AdminLogin Error", error);
    return res.status(500).json({ message: "AdminLogin Error" });
  }
};