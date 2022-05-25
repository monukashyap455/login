const mongoose = require("mongoose");

const fraudSchema = new mongoose.Schema({
    userId: { type: "ObjectId", required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: false },
    to: { type: String },
    from: { type: String }

})
module.exports = new mongoose.model("fraud Transcation", fraudSchema);