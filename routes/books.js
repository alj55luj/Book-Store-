const express = require('express');
const router=express.Router();
const asyncHandler = require('express-async-handler');
const {validateCreateBook,validateUpdateBook,Book}=require("../models/Book");
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
//Http Methods /Verbs
/*
@desc Get all books 
@route /api/books
@metod GET
@access public
*/ 
router.get("/",asyncHandler(
  async(req,res)=>{//callback func
  const books=await Book.find().populate("author",["firstName","lastName","_id"]);//to get author details instead of id
  res.status(200).json(books);//it will return 
}));
/*
@desc Get book By Id 
@route /api/books/:id
@metod GET
@access public
*/ 
router.get("/:id",asyncHandler(
  async(req,res)=>{//callback func
  const book= await Book.findById(req.params.id).populate("author");
  if(book){
  res.status(200).json(book);
}else{
   res.status(400).json({message:"book not found"});
}}));
/*
@desc Create New book 
@route /api/books
@metod POST
@access Private (only admin )
*/ 
router.post("/",verifyTokenAndAdmin,asyncHandler(
  async(req,res)=>{//callback func

  const {error}=validateCreateBook(req.body);

  if(error){
  return res.status(400).json({message: error.details[0].message});//400 error from client
}

const book= new Book({
title:req.body.title,
author :req.body.author,
description:req.body.description,
price:req.body.price,
cover:req.body.cover ,
 });
const result= await book.save();
res.status(201).json(result);//201 => created successfully
}));
/*
@desc Update New book 
@route /api/books/:id
@metod PUT
@access Private (only admin )
*/ 
router.put("/:id",verifyTokenAndAdmin,asyncHandler(
  async(req,res)=>{
 
  const {error}=validateUpdateBook(req.body);
 
  if(error){
  return res.status(400).json({message: error.details[0].message});//400 error from client
}
const updatedBook= await Book.findByIdAndUpdate(req.params.id,{
$set:{
title:req.body.title,
author :req.body.author,
description:req.body.description,
price:req.body.price,
cover:req.body.cover 
  }
},{new:true})
res.status(200).json(updatedBook);
}));

/*
@desc Delete New book 
@route /api/books/:id
@metod DELETE
@access Private (only admin )
*/ 
router.delete("/:id",verifyTokenAndAdmin,asyncHandler(
  async(req,res)=>{
 
const book=await Book.findById(req.params.id);
if(book){
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({massage: "book has been deleted"});
}else{
  res.status(404).json({massage: "book not found"});
}
}));

module.exports= router;