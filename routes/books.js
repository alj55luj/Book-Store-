const express = require('express');
const router=express.Router();
const {getAllBooks,
       getBookById,
       createBook,
       updateBook,
      deleteBook
      } = require('../controllers/bookController');
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
//Http Methods /Verbs
// /api/books
router.route("/")
  .get(getAllBooks)
  .post(verifyTokenAndAdmin,createBook);//توكن بالروت حصراً

  // /api/books/:id
  router.route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin,updateBook)
  .delete(verifyTokenAndAdmin,deleteBook);//توكن بالروت حصراً

module.exports= router;