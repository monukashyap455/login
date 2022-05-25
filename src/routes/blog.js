const router = require("express").Router();
const blogController = require("../controller/blog");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");


router.post('/blog',upload.single('image'),verifyToken,blogController.blogAdd)
router.get('/blog/:id',verifyToken,blogController.blogGet)



module.exports = router;