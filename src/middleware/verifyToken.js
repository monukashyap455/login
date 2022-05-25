const read = require('body-parser/lib/read');
const jwt = require('jsonwebtoken');
const user = require('../model/User');
const loginUser = require('../model/loginUser');

const verifyToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }
        if (token == null) {
            return res.status(403).json("token is require for this route");
        }
        const verifyUser = jwt.verify(token, "secretKey");
        // console.log(verifyUser.userDb_id);

        const currentUser = await user.findOne({ _id: verifyUser.userDb_id }).populate("roleId")
        // console.log(currentUser);
        const loginUsers = await loginUser.findOne({ login_id: currentUser._id });
        // console.log(loginUsers);

        if (!currentUser) {
            return res.status(404).json({
                status: "Invalid token "
            })
        }
        req.currentUser = currentUser;
        req.loginUsers = loginUsers
        // console.log(loginUsers);
        next()
    } catch (error) {
        res.send(error)
    }
}
module.exports = verifyToken;