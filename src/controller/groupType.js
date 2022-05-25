const groupType = require("../model/groupType");


//group type get  
module.exports.getGroup = async (req, res) => {
    try {
        const groups = await groupType.find({});
        console.log(groups);
        res.status(200).json({
            data: groups
        });
    } catch (error) {
        res.send(error)

    }

}
// create group type 
module.exports.groupTypeAdd = async (req, res,) => {
    try {
        const groupTypeData = new groupType({
            groupType: req.body.groupType,

        })

        groupTypeData.save()
            .then((result) => { res.json(result); console.log(result) })
            .catch((err) => { res.json(err); console.log(err) })
    } catch (error) {
        res.send(error)
    }
}
// group type delete 
module.exports.groupTypeRemove = async (req, res,) => {
    try {
        const groupRemoveId = req.params.id

        await groupType.findByIdAndDelete(groupRemoveId);
        res.status(200).json({
            data: null,
            message: 'GroupType has been deleted'
        });
        
           
    } catch (error) {
        res.send(error)
    }
}