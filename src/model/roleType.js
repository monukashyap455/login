const mongoose = require("mongoose");

const roleType = new mongoose.Schema({

    roleType: { type: String, },
    groupType: { type: "ObjectId", ref: 'groupType' },

})

module.exports = new mongoose.model("roleType", roleType);