const router = require("express").Router();
const roleAndPermissionController = require("../controller/roleAndPermission")
const verifyToken = require("../middleware/verifyToken");
const allowSuperAdmin = require("../middleware/checkRole");
const checkPermission = require("../middleware/checkPermission");



router.get('/roleandpermission', verifyToken, checkPermission || allowSuperAdmin, roleAndPermissionController.getroleAndPermission)

router.post('/roleandpermission', checkPermission || allowSuperAdmin, roleAndPermissionController.roleAndPermissionAdd)

router.put('/roleandpermission', checkPermission || allowSuperAdmin, roleAndPermissionController.roleAndPermissionUpdate)

router.delete('/roleandpermission', checkPermission || allowSuperAdmin, roleAndPermissionController.roleAndPermissionRemove)

module.exports = router;