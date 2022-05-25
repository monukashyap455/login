const router = require("express").Router();
const groupTypeController = require("../controller/groupType")
const allowSuperAdmin = require("../middleware/checkRole");
const verifyToken = require("../middleware/verifyToken");



router.get('/group', verifyToken, allowSuperAdmin, groupTypeController.getGroup)

router.post('/group/add', verifyToken, allowSuperAdmin, groupTypeController.groupTypeAdd)

router.post('/group/add', verifyToken, allowSuperAdmin, groupTypeController.groupTypeRemove)


module.exports = router;