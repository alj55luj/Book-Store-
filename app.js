const express = require("express");
const logger = require('./middlewares/logger');
const {notFound,errorHandler}=require('./middlewares/error')
const dotenv = require('dotenv').config();
const path = require('path');
const connectToDB = require("./config/db"); 
const helmet = require('helmet');//more secure
const cors = require('cors');
//Connection To Database
connectToDB();
//Init APP
 app=express();
// Static Folder
 app.use(express.static(path.join(__dirname,'images'))); //to make the images static
//apply Middlewares//sorting is important  
app.use(express.json());
app.use(express.urlencoded({extended: false}));//form fw//to know the email from view
app.use(logger);//custom middleware
//Helmet
app.use(helmet());//third part middleware form npm and cors
//Cors Policy
app.use(cors({
    origin: '*' //any domain can access our api
})); // or app.use(cors());
//set View Engine
app.set("view engine","ejs");//if pug we put it instead of ejs
//Routes//middleware cause of app.use
app.use("/api/books",require('./routes/books'));
app.use("/api/authors",require('./routes/authors'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/users",require('./routes/users'));
app.use("/password",require('./routes/password'));
app.use("/api/upload",require('./routes/upload'));

//Erro Handler Middleware
app.use(notFound)
app.use(errorHandler);
//Running The Server
const PORT=process.env.PORT||5000;  
app.listen();
app.listen(PORT,(req,res)=>{
    console.log(`Server is running in ${process.env.NODE_ENV} node on port ${PORT}`);
});
 