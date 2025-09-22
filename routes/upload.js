const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
destination: function (req, file, cb) {//cb call body
cb(null,path.join(__dirname,"../images"));
},
filename: function (req, file, cb) {//cb call body
cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);//to keep the original
}// replace : to - and accept the same photo and it will change the name
});
const upload = multer({ storage });//same name

// /api/upload
router.post('/',upload.single("image"),(req, res) => {
res.status(200).json({ message: 'File uploaded successfully' });
});
module.exports = router;