const roleType = require("../model/roleType");

// get roles 
module.exports.getRoles = async (req, res) => {
    try {
        const roles = await roleType.find({});
        console.log(roles);
        res.status(200).json({
            data: roles
        });
    } catch (error) {
        res.send(error)

    }

}
// create role type 
module.exports.roleTypeAdd = async (req, res,) => {
    try {
        const roleTypeData = new roleType({
            roleType: req.body.roleType,
        })
        roleTypeData.save()
            .then((result) => { res.json(result); console.log(result) })
            .catch((err) => { res.json(err); console.log(err) })
    } catch (error) {
        res.send(error)
    }
}
// role type delete 
module.exports.roleTypeRemove = async (req, res,) => {
    try {
        const roleId = req.params.id
        await roleType.findByIdAndDelete(roleId);
        res.status(200).json({
            data: null,
            message: 'Role has been deleted'
        });

    } catch (error) {
        res.send(error)
    }
}