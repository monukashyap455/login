const user = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const transporter = require('../middleware/transporter');
const login = require("../model/loginUser")
const resHelper = require("../helper/resHelper");
const lang = require("../helper/lang");
const loginUser = require("../model/loginUser");



// user registration 
module.exports.userRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, mobile, username, password, conformPassword, roleId } = req.body
        // valid email check 
        if (!(validator.isEmail(email))) {
            return res.status(402).json(" wrong email id please use the current email")
        };

        // conform password check
        if (!(password == conformPassword)) {
            return res.status(400).json("conform password are not matched ")
        }
        // // // strong password check
        const strongPassword = (validator.isStrongPassword(password, [{
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }]))
        if (!strongPassword) {
            return resHelper.errorResponse(res, lang.STRONGPASS)
        };

        // //password hased
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);

        const userDb = new user({
            firstname,
            lastname,
            roleId,
            email,
            mobile,
            password: hashedPassword,
            username,
        })

        const loginUsers = new loginUser({
            login_id: userDb._id,
            email: userDb.email
        })
        // //user data saved in database 
        await userDb.save()
        await loginUsers.save();

        if (!userDb) {
            return res.status(404).json("something went wrong !")
        };
        // //token generate 
        const token = jwt.sign({ _id: userDb._id }, 'secretKey', { expiresIn: "1h" });
        //send email for verification 
        transporter.sendMail({
            from: "monukashyaptest@gmail.com",
            to: email,
            subject: "Email verifycation for register",
            html: `<p>You requested for verify the email and click the link , kindly use this
                     <p>http://localhost:5000/register/verify/${token}</p>`
        })
        res.status(200).json("registration successful please  click the link and verify the account  ")
    } catch (error) {
        res.send(error)

    }
}
// user login 
module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        let userDb = await user.findOne({ email: email });

        if (!userDb)
            return res.status(400).json("Email not found please try again ")

        if (userDb.verified != true) {
            return res.send("your account is not verifyed please verifyed the account")
        }
        bcrypt.compare(password, userDb.password, async (err, result) => {
            if (!result) {
                return res.status(401).json({ msg: "invalid password please try again " })
            }
        })
        const OTP = Math.floor(1000 + Math.random() * 9000,);
        const otpExpiresIn = Date.now() + 60 * 1000 * 10;

        const token = jwt.sign({ userDb_id: userDb._id }, 'secretKey', { expiresIn: "24h" });

        const loginUsers = await loginUser.findOne({ login_id: userDb._id });

        loginUsers.otp = OTP;
        loginUsers.otpExpiresIn = otpExpiresIn;

        loginUsers.tokens = loginUsers.tokens.concat({ token: token });

        await loginUsers.save();

        await transporter.sendMail({
            from: "monukashyaptest@gmail.com",
            to: email,
            subject: "Email verifycation for login time",
            html: `<p> this email sent to login verification 
                    <p>${OTP}</p>`
        })
        // res.cookie('jwt', token)
        res.status(200).json({ token, msg: "otp sent to your mail" })
    } catch (error) {
        res.status(500).json(error)
    }
}
// user logout 
module.exports.userLogout = async (req, res) => {
    try {

        
        const token = req.cookies.jwt
        const loginUsers = req.loginUsers
        loginUsers.tokens = loginUsers.tokens.filter((e) => {
            return e.token != token
        })
        res.clearCookie("jwt");
        await req.loginUsers.save();
        res.send("logout success");

    } catch (error) {
        console.log(error);
        res.send(error)
    }
}
// user update me 
module.exports.updateMe = async (req, res, next) => {
    try {
        const id = req.currentUser
        console.log(id);
        if (req.body.password || req.body.conformPassword) {
            return res.status(401).json({
                status: "fail",
                Msg: "you can't update password from here, Use /updatePassword API"
            })
        }
        const { firstname, lastname, email, mobile, username, userImage, roleId, } = req.body;
        const updatedUser = await user.updateOne({ _id: id }, {
            $set: {
                firstname,
                lastname,
                email,
                mobile,
                username,
                userImage,

            }
        })
        res.status(200).json(" user updated sucessfully");
    } catch (error) {

    }
}
// login user update password 
module.exports.updatePassword = async (req, res) => {
    try {
        const token = req.cookies.jwt

        const tokenVerify = jwt.verify(token, "secretKey")
        if (!tokenVerify) {
            return res.status(400).json("Invalid token please try again ")
        }
        const { oldPassword, password, conformPassword } = req.body
        if (oldPassword < 1) {
            return res.send({ status: 201, message: "Please filled the Old Password" });
        }
        const loginUser = await login.findOne({ token: token })

        const userFind = await user.findOne({ _id: loginUser.login_id })

        const matchpass = await bcrypt.compare(oldPassword, userFind.password)
        if (!matchpass) {
            return res.send({ status: 201, message: " old password are not matched" })
        }

        if (!(password === conformPassword)) {
            return res.send({ status: 201, message: " Conform Password are not match" });
        }
        const hashedPass = await bcrypt.hash(password, 10)

        const updatePassword = await user.updateOne({ _id: userFind.id },
            {
                $set:
                    { password: hashedPass }
            })
        console.log(updatePassword);

        res.status(200).json({ message: "Password updated sucess" })

    } catch (error) {
        res.send(error)
    }
}
// forget passsword 
module.exports.forgetPassword = async (req, res) => {
    try {
        const email = req.body.email
        const userDB = await user.findOne({ email: email });
        if (!userDB) {
            return res.send("email not found please enter the correct email")
        }
        const token = jwt.sign({ id: userDB._id }, "helloEveryaone", { expiresIn: "5min", });

        res.send({ status: 200, message: "link send your email id click to forget password" })
        await transporter.sendMail({
            from: "monukashyaptest@gmail.com",
            to: email,
            subject: "forget pasword ",
            html: `<p> this email sent to for password forget
            <p>http://localhost:4000/api/forgetVerify/${token}</p>`
        })

    } catch (error) {
        res.send(error)
    }
}
//  get profile login 
module.exports.profile = async (req, res) => {
    try {
        const loginUser = req.currentUser
        console.log(loginUser);

        res.status(400).json(
            {
                "Name": loginUser.username,
                "Firstname": loginUser.firstname,
                "Lastname": loginUser.lastname,
                "Mobile": loginUser.mobile,
                "Email": loginUser.email,
                "Status": loginUser.verified
            }
        )
    } catch (error) {
        res.send(error)
    }
}
