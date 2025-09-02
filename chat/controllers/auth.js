import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import Auth from "../models/auth.js";
import jwt from "jsonwebtoken";


const signupSchema = Joi.object({
    phone :Joi.string().required().min(10),
    password: Joi.string().required()
}); 
const loginSchema =Joi.object({
    phone :Joi.string().required().min(10),
    password: Joi.string().required()
})

export const signup =async(req,res) =>{
    const {error} = signupSchema.validate(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    const {phone,password} = req.body;
    try{
        const hashedPassword= await bcrypt.hash(password, 10);
        const newSign = new Auth({
            phone,
            password: hashedPassword
        });
        const SavedUser= await newSign.save();
        res.status(200).json({message: "User registered successfully", user:SavedUser});
    }catch(err){
        res.status(200).json({message: "Signup failed", error:err.message});
    }
};

export const login= async(req,res)=>{
    const {error} = loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    const {phone,password}= req.body;
    try{
        const user= await Auth.findOne({phone});
        if(!user){
            return res.status(400).json({message: "user not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(200).json({message:"Inavalid Password"});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "3h"});
        res.status(200).json({
            message: "Login successful",
            token,
            user:{id:user._id, phone: user.phone}
        });

    }catch(err){
        res.status(500).json({massage: "Login failed", error: err.message})
    }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
      console.log("🔍 User ID:", userId);
    const { oldPassword, newPassword } = req.body;
       console.log("🧪 Passwords received");

    const user = await Auth.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect old password." });

    const hashedNew = await bcrypt.hash(newPassword, 10);
    user.password = hashedNew;
    await user.save();

    res.status(200).json({ message: "✅ Password changed successfully!" });
  } catch (err) {
      console.error("🔥 Server error in changePassword:", err);
    res.status(500).json({ message: "Server error. Try again." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await Auth.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: '🗑️ Account deleted successfully.' });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ message: 'Server error while deleting account.' });
  }
};