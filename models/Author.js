const { string } = require('joi');
const mongoose = require('mongoose');
const Joi = require('joi');
const AuthorSchema=new mongoose.Schema({//DB level
firstName:{
    type:String,
    required:true,
    trim:true,
   minlength:3,
   maxlength:200,
},
lastName:{
    type:String,
    required:true,
    trim:true,
   minlength:3,
   maxlength:200,
},
nationality:{
    type:String,
    required:true,
    trim:true,
   minlength:2,
   maxlength:100,
},
image:{
    type:String,
    default:"default-avatar.png",//db give it default
},
},{
    timestamps:true//create and update date
}); 


//Validate Create Author
function validateCreateAuthor(obj){//express level
  const schema=Joi.object({//good lib for validation
  firstName:Joi.string().trim().min(3).max(200),
 lastName:Joi.string().trim().min(3).max(200),
  nationality:Joi.string().trim().min(2).max(100),
image:Joi.string().trim(),
});  
return schema.validate(obj);//return error if its not complete

} 


//Validate Update Author
function validateUpdateAuthor(obj){
  const schema=Joi.object({//good lib for validation
  firstName:Joi.string().trim().min(3).max(200).required(),
 lastName:Joi.string().trim().min(3).max(200).required(),
  nationality:Joi.string().trim().min(2).max(100).required(),
image:Joi.string().trim().required(),
});  
return schema.validate(obj);//return error if its not complete
}

const Author=mongoose.model("Author",AuthorSchema)
module.exports={
    Author ,
validateCreateAuthor,
validateUpdateAuthor
}