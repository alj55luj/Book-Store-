const express = require('express');
const router =express.Router();
const {verifyTokenAndAdmin}=require('../middlewares/verifyToken');
const asyncHandler = require('express-async-handler');
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
}=require("../controllers/authorController");

router.route("/")
  .get(getAllAuthors)
  .post(verifyTokenAndAdmin,createAuthor);

router.route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin,updateAuthor)
  .delete(verifyTokenAndAdmin,deleteAuthor);

module.exports=router;