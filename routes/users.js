const express = require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization}=require("../middlewares/verifyToken")
const {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}=require("../controllers/userController");

router.get("/",verifyTokenAndAdmin,getAllUser);

router.route("/:id")
  .get(verifyTokenAndAuthorization,getUserById)
  .put(verifyTokenAndAuthorization,updateUser)
  .delete(verifyTokenAndAuthorization,deleteUser);

module.exports=router;