const express = require('express');
const router =express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const {
    User,
    validateLoginUser,
    validateRegisterUser
}=require("../models/User")
/*
@desc Register New User
@route /api/auth/register
@method POST
@access Public
*/ 
router.post("/register",asyncHandler(async(req,res)=>{

    const {error}=validateRegisterUser(req.body);
if(error){
 return res.status(400).json({message: error.details[0].message}); 
}
let user = await User.findOne({email: req.body.email});
if(user){
    return res.status(400).json({message:"this user already registered"});
}
const salt=await bcrypt.genSalt(10);
req.body.password=await bcrypt.hash(req.body.password,salt);

user = new User({
 email : req.body.email,
 username : req.body.username,
 password : req.body.password,
 }); 
const result= await user.save();
const token=user.generateToken();
const {password,...other}=result._doc;//to exclude password from the response
res.status(201).json({...other,token});//sending other details except password
})); 

/*
@desc Login User
@route /api/auth/login
@method POST
@access Public
*/ 
router.post("/login",asyncHandler(async(req,res)=>{

    const {error}=validateLoginUser(req.body);
if(error){
 return res.status(400).json({message: error.details[0].message}); 
}

let user = await User.findOne({email: req.body.email});
if(!user){
    return res.status(400).json({message:"invalid email or password"}); 
}
const isPasswordMatched=await bcrypt.compare(req.body.password,user.password);
if(!isPasswordMatched){
    return res.status(400).json({message:"invalid email or password"});
}
const token=user.generateToken();

const {password,...other}=user._doc;//to exclude password from the response
res.status(200).json({...other,token});//sending other details except password
})); 
module.exports=router;  