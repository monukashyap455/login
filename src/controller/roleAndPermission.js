const roleAndPermission = require("../model/roleAndPermission");


//  role and permission get 
module.exports.getroleAndPermission = async (req, res) => {
    try {
        const getroleAndPermissionDb = await roleAndPermission.find({});
        console.log(getroleAndPermissionDb);
        res.status(200).json({
            data: getroleAndPermissionDb
        });
    } catch (error) {
        res.send(error)

    }

}
// role and permission create 
module.exports.roleAndPermissionAdd = async (req, res,) => {
    try {
        const { roleType, permisssion } = req.body

        const permissionAccessData = roleAndPermission({
            roleType,
            permisssion
        })
        await permissionAccessData.save(function (err, result) {
            if (err) { console.log(err) }
            else { res.send(result) }
        })
    } catch (error) {
        res.send(error)
    }
}
// role and permission  update 
module.exports.roleAndPermissionUpdate = async (req, res,) => {
    try {
        const { roleType, permisssion } = req.body

        const updatedObj = await roleAndPermission.findOneAndUpdate({ roleType: roleType }, {
            $push: {
                permisssion: permisssion,
            },
        }, { new: true });

        console.log("Updated", updatedObj)

        res.status(200).json({
            data: updatedObj,
            message: 'permissions has been updated'
        });

    } catch (error) {
        res.send(error)
    }
}
// role and permission delete 
module.exports.roleAndPermissionRemove = async (req, res,) => {
    try {
        const removeId = req.body.id

        await roleAndPermission.findByIdAndDelete(removeId);
        res.status(200).json({
            data: null,
            message: 'roleAndPermission has been deleted'
        });
    } catch (error) {
        res.send(error)
    }
}
