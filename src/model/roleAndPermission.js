let mongoose = require("mongoose");

let roleAndPermission = new mongoose.Schema({

    roleType: { type: mongoose.Types.ObjectId, ref: 'roleType' },
    permisssion: [{ type: mongoose.Types.ObjectId, ref: 'permission' }],
    createat: { type: Date, default: Date.now, },

})

module.exports = mongoose.model("roleAndPermission", roleAndPermission);