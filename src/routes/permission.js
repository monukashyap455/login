const router = require("express").Router();
const permissionsController = require("../controller/permissisons");
const verifyToken = require("../middleware/verifyToken");
const allowSuperAdmin = require("../middleware/checkRole");
const checkPermission = require("../middleware/checkPermission");


router.get('/permisssions', verifyToken, checkPermission || allowSuperAdmin, permissionsController.getPermissions)

router.post('/permisssions', verifyToken, checkPermission || allowSuperAdmin, permissionsController.permisssionAdd)

router.delete('/permisssions/:id', verifyToken, checkPermission || allowSuperAdmin, permissionsController.permisssionRemove)

module.exports = router;