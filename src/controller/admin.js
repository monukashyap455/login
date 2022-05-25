const user = require("../model/User");


// get profile by id 
module.exports.getProfileById = async (req, res) => {
    try {
        const userid = req.params.id

        const userDb = await user.findOne({ _id: userid })
        if (!userDb) {
            return res.status(400).json("User not exict please try again")
        }
        res.status(400).json(
            {
                "Name": userDb.username,
                "Firstname": userDb.firstname,
                "Lastname": userDb.lastname,
                "Mobile": userDb.mobile,
                "Email": userDb.email,
                "Status": userDb.verified
            }
        )
    } catch (err) {
        res.send(err)
    }
}
//get all users 
module.exports.getUsers = async (req, res) => {
    try {
        const userPermission = req.permissions
        console.log(userPermission);
        if (!userPermission.includes("getUsers"))
            return res.status(400).json("you are not authorized this route")
        const users = await user.find({});
        // console.log(users);
        res.status(200).json({
            result: users
        });
    } catch (error) {
        res.send(error)

    }

}
// get user by id 
module.exports.getUserById = async (req, res) => {
    try {
        const userPermission = req.permissions
        // console.log(userPermission);
        if (!userPermission.includes("getUser"))
            return res.status(400).json("you are not authorized this route")
        const userId = req.params.id
        const userData = await user.find({ _id: userId });
        // validateBefore: false
        if (!userData) return ('User does not exist');
        res.status(200).json({
            data: userData
        });
    } catch (error) {
        res.send(error)

    }
}
//update user 
module.exports.updateUser = async (req, res) => {
    try {
        const userPermission = req.permissions
        // console.log(userPermission);
        if (!userPermission.includes("updateUser"))
            return res.status(400).json("you are not authorized this route")
        const userId = req.params.id;
        const update = req.body
        const userDb = await user.updateOne({ _id: userId }, { $set: { update } })
        res.status(200).json({
            data: userDb,
            message: 'User has been updated'
        });
    } catch (error) {
        res.send(error)
    }
}
// user delete 
module.exports.deleteUser = async (req, res) => {
    try {
        const userPermission = req.permissions
        console.log(userPermission);
        if (!userPermission.includes("deleteUser"))
            return res.status(400).json("you are not authorized this route")
        const userId = req.params.id;
        await user.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
    }
}

