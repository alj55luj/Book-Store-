const mongoose = require('mongoose');
async function connectToDB() {
  try {
  await  mongoose.connect(process.env.MONGO_URI);
console.log("Connected To MongoDB.....");
} catch (error) {
    console.log("Connected Failed To MongoDB!",error);
  }  
    
}

module.exports = connectToDB;


//   mongoose.connect(process.env.MONGO_URI)//db exist add data else init new db 
//     .then(()=>console.log("Connected To MongoDB....."))
//     .catch((error)=>console.log("Connected Failed To MongoDB!",error)); 
  