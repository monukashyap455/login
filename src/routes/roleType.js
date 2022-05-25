const router = require("express").Router();
const roleTypeController = require("../controller/roleType")
const verifyToken = require("../middleware/verifyToken");
const allowSuperAdmin = require("../middleware/checkRole");
const checkPermission = require("../middleware/checkPermission");



router.get('/roles', verifyToken, checkPermission || allowSuperAdmin, roleTypeController.getRoles)

router.post('/roles/', verifyToken, checkPermission || allowSuperAdmin, roleTypeController.roleTypeAdd)

router.delete('/roles//:id', verifyToken, checkPermission || allowSuperAdmin, roleTypeController.roleTypeRemove)


module.exports = router;