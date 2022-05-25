const roleAndPermission = require("../model/roleAndPermission");


const checkPermission = async (req, res, next) => {
    try {
        const currentUser = req.currentUser

        const roleId = currentUser.roleId._id.toString();

        const roleDb = await roleAndPermission.findById({ _id: roleId }).populate("roleType")

        const permissiondb = await roleAndPermission.findById({ _id: roleId }).populate("permisssion")

        let allPermission = []

        permissiondb.permisssion.forEach(e => {

            allPermission.push(e.permission);

        });
        req.permissions = allPermission
        next();

    } catch (error) {
        res.send(error)
    }
}

module.exports = checkPermission;