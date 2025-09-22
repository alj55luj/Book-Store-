const asyncHandler = require('express-async-handler');
const {Author,validateCreateAuthor,validateUpdateAuthor} = require('../models/Author');

/*
@desc Get All Authors
@route /api/authors
@method GET
@access Public
*/ 
module.exports.getAllAuthors = asyncHandler(//منرتاح من try & catch
  async(req,res)=>{
  const {pageNumber}=req.query;
  const authorsPerPage=2;
     const authorList = await Author.find()//pagination
     .skip((pageNumber - 1) * authorsPerPage)//سكيب بسبح اول تنتين/
     .limit(authorsPerPage);// limit get the 2 after the skip
     // /sort({firstName:1}).select("firstName  lastName -_id");//- remove id
  //مشان ياخد authors  من داتا بيز//sort 1 تصاعدي -1 تنازلي//select يحدد شو الحقول اللي بدي اياها
res.status(200).json(authorList);
  });

/*
@desc Get Authors By Id
@route /api/authors/:id
@method GET
@access Public
*/ 
  module.exports.getAuthorById = asyncHandler(
  async(req,res)=>{
  
    
const author=await Author.findById(req.params.id);
if(author){
res.status(200).json(author);
}else{
res.status(400).json({message:"author not found"});
}   });

/*
@desc Create New Authors
@route /api/authors/
@method POST 
@access Private(only Admin)
*/ 
 module.exports.createAuthor = asyncHandler(
  async(req,res)=>{
const {error}=validateCreateAuthor(req.body);

 if(error){
  return res.status(400).json({message: error.details[0].message});//400 error from client
}

  const author=new Author({//class from obj author
firstName:req.body.firstName,
lastName :req.body.lastName,
nationality:req.body.nationality,
image:req.body.image,
});
const result= await author.save();//res promise success or error
 
res.status(201).json(result);
});


/*
@desc Update New Author
@route /api/authors/:id
@metod PUT
@access Private (only admin )
*/ 
module.exports.updateAuthor = asyncHandler(
  async(req,res)=>{
 const {error}=validateUpdateAuthor(req.body);
  if(error){
  return res.status(400).json({message: error.details[0].message});//400 error from client
}

  
const author= await Author.findByIdAndUpdate(req.params.id,{
  $set:{
    firstName:req.body.firstName,
    lastName :req.body.lastName,
    nationality:req.body.nationality,
    image:req.body.image,
  }
}, { new: true} );//to return the updated obj/
res.status(200).json(author);
});

/*
@desc Delete New Author 
@route /api/authors/:id
@metod DELETE
@access Private (only admin )
*/ 
module.exports.deleteAuthor = asyncHandler(
  async(req,res)=>{
  
const author=await Author.findById(req.params.id);
if(author){
  await Author.findByIdAndDelete(req.params.id);
  res.status(200).json({massage: "author has been deleted"});
}else{
  res.status(404).json({massage: "author not found"});
}
 
}
)
