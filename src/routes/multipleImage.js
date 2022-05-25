const router = require("express").Router();
const upload = require("../middleware/upload")
const multipleImageController = require("../controller/multipleImage");
const verifyToken = require("../middleware/verifyToken");





router.post('/multipleImage', verifyToken, upload.array('image'), multipleImageController.multipleImageAdd)

router.get('/multipleImage', verifyToken, multipleImageController.getMultipleImage)

router.put('/multipleImage/:img', verifyToken, upload.single('image'), multipleImageController.updateMultipleImage)

router.delete('/multipleImage/:img', verifyToken, multipleImageController.deleteMultipleImage)

module.exports = router;