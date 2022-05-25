const mongoose = require("mongoose");

const permisssionType = new mongoose.Schema({

    permission: { type: String, required: true },
    createAt: { type: Date, default: Date.now }

})

module.exports = new mongoose.model("permission", permisssionType);