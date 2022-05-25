const permisssions = require("../model/permission");

//  get permissions
module.exports.getPermissions = async (req, res) => {
    try {
        const permisssionsDb = await permisssions.find({});
        res.status(200).json({
            data: permisssionsDb
        });
    } catch (error) {
        res.send(error)
    }
}
// permissions add 
module.exports.permisssionAdd = async (req, res,) => {
    try {
        const userPermission = req.permissions

        if (!userPermission.includes("permisssionAdd")) {
            return res.status(400).json("you are not authorized this route")
        }
        const permisssionData = new permisssions({
            permission: req.body.permission,
        })
        permisssionData.save()
            .then((result) => { res.json(result); console.log(result) })
            .catch((err) => { res.json(err); console.log(err) })
    } catch (err) {
        res.send(err)
    }
}
// permissions delete 
module.exports.permisssionRemove = async (req, res,) => {
    try {
        const permissionId = req.params.id

        await permisssions.findByIdAndDelete(permissionId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
        res.send(error)
    }
}
