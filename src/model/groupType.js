const mongoose = require("mongoose");

const groupType = new mongoose.Schema({
    groupType: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = new mongoose.model("groupType", groupType);