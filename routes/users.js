const express = require('express');
const router =express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User,validateUpdateUser}=require("../models/User")
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization}=require("../middlewares/verifyToken")
/*
@desc Get All User
@route /api/users
@method    GET
@access Private(only admin)
*/ 
router.get("/",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{  
const users=await User.find().select("-password");//to exclude password from the response
res.status(200).json(users);
   
}));

/*
@desc Get User By Id
@route /api/users/:id
@method    GET
@access Private(only admin& user himself)
*/ 
router.get("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{  
const user=await User.findById(req.params.id).select("-password");//to exclude password from the response
if(user){
res.status(200).json(user);
}else{
res.status(404).json({message:"user not found"});
}
}));


/*
@desc Update  
@route /api/users/:id
@method PUT
@access Private
*/ 
router.put("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{  
    const {error}=validateUpdateUser(req.body);
if(error){
 return res.status(400).json({message: error.details[0].message}); 
}

if(req.body.password){
 const salt=await bcrypt.genSalt(10);
 req.body.password=await bcrypt.hash(req.body.password,salt);
}
 const  updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set: {
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    }
   },{new:true}).select("-password");//to exclude password from the response
    res.status(200).json(updatedUser);
}));

/*
@desc Delete User 
@route /api/users/:id
@method  DELETE
@access Private(only admin& user himself)
*/ 
router.delete("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{  //protected route cuz of verify
const user=await User.findById(req.params.id).select("-password");//to exclude password from the response
if(user){
  await User.findByIdAndDelete(req.params.id);  
res.status(200).json({message:"user has been deleted successfully"});
}else{
res.status(404).json({message:"user not found"});
}
}));

module.exports=router;