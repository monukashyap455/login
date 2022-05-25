const router = require("express").Router();
const upload = require("./../middleware/upload");
const cmsController = require("../controller/cms");
const adminController = require("../controller/admin");
const verifyToken = require("../middleware/verifyToken");
const allowSuperAdmin = require("../middleware/checkRole");
const checkPermission = require("../middleware/checkPermission");



router.get('/profile/:id', checkPermission || allowSuperAdmin, adminController.getProfileById)

router.get('/user/:id', checkPermission || allowSuperAdmin, adminController.getUserById)

router.get('/users', verifyToken, checkPermission || allowSuperAdmin, adminController.getUsers)

router.put('/user/:id', verifyToken, checkPermission || allowSuperAdmin, adminController.updateUser)

router.delete('/user/:id', verifyToken, checkPermission || allowSuperAdmin, adminController.deleteUser)

router.post('/cms', upload.single('image'), verifyToken, checkPermission || allowSuperAdmin, cmsController.cmsCreate)

router.put('/cms/:id', upload.single('image'), verifyToken, checkPermission || allowSuperAdmin, cmsController.cmsUpdate)


module.exports = router;
