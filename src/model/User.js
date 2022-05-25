const mongoose = require("mongoose");
const ip = require("ip");

const userSchema = mongoose.Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, unique: true, required: true, minLength: 10, maxlength: 12 },
    username: { type: String, required: true, unique: true },
    oldPassword: { type: String, },
    password: { type: String, required: true, minLength: 8 },
    conformPassword: { type: String, },
    userImage: { type: String, },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "roleAndPermission", required: true },
    verified: { type: Boolean, default: false },
    token: { type: String, },
    ip: { type: String, default: ip.address() },

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);