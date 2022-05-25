const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const verifyController = require("../controller/verify");
const userController = require("../controller/user")



router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.get('/logout',verifyToken, userController.userLogout)

router.put('/update', verifyToken, userController.updateMe)

router.post('/password/update', verifyToken, userController.updatePassword)

router.post('/password/forget', verifyToken, userController.forgetPassword)

router.get('/profile', verifyToken, userController.profile)


router.get('/register/verify/:token', verifyController.registerVerify)
router.get('/login/verify', verifyController.loginVerify)
router.get('/verify/forget/:token', verifyToken, verifyController.forgetVerify)



module.exports = router;