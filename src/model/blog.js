const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    userId: {
        type: "ObjectId",
        required: true,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: false
    },

    image: {
        type: String,
        required: true
    }

}, { timestamps: true })




module.exports = new mongoose.model("blog", blogSchema);