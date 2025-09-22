const notFound =(req,res,next)=>{
const error=new Error(`Not Found - ${req.orginalUrl}`);
res.status(404);
next(error);//if its not give a res
};

const errorHandler=( err,req,res,next) => {//error handling middleware
const statusCode = res.statusCode === 200 ? 500: res.statusCode;
  res.status(statusCode).json({message:err.message});
};

module.exports={
    notFound,errorHandler
} 