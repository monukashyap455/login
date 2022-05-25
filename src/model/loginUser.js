const mongoose = require("mongoose");
const ip = require("ip");

let userlogin = mongoose.Schema({
    login_id: {
        type: 'ObjectId'
    },
    email: {
        type: String
    },
    tokens: [
        {
            token: { type: String },
            ip: { type: String, default: ip.address() }
        }
    ],
    otp: {
        type: Number,
        default: null
    },
    otpExpiresIn: {
        type: Date,
        default: null
    },
    createat: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model("loginUser", userlogin);