const roleType = require("../model/roleType");


const allowSuperAdmin = async (req, res, next) => {
    try {
        const currentUser = req.currentUser

        const roleId = currentUser.roleId.roleType.toString()

        const roleDb = await roleType.findById({ _id: roleId }).populate("roleType")

        if (roleDb.roleType != "Super admin") {
            return res.status(404).json({
                status: "you are not authorized in this route! you are not super admin "
            })
        }
        next();
    } catch (error) {
        res.send(error)
    }
}

module.exports =allowSuperAdmin

