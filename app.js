const express = require("express");
const logger = require('./middlewares/logger');
const {notFound,errorHandler}=require('./middlewares/error')
const dotenv = require('dotenv').config();
const connectToDB = require("./config/db"); 
//Connection To Database
connectToDB();
//Init APP
 app=express();
//apply Middlewares//sorting is important  
app.use(express.json());
app.use(logger)
//Routes//middleware cause of app.use
app.use("/api/books",require('./routes/books'));
app.use("/api/authors",require('./routes/authors'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/users",require('./routes/users'));

//Erro Handler Middleware
app.use(notFound)
app.use(errorHandler);
//Running The Server
const PORT=process.env.PORT||5000;  
app.listen();
app.listen(PORT,(req,res)=>{
    console.log(`Server is running in ${process.env.NODE_ENV} node on port ${PORT}`);
});
 