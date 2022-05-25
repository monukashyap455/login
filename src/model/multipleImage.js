const mongoose = require("mongoose");

const nftsSchema = new mongoose.Schema({

    userId: { type: "ObjectId", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: Array,

})

module.exports = new mongoose.model("nftc", nftsSchema);