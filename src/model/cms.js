const mongoose = require("mongoose");

const cmsSchema =  new mongoose.Schema({
    favicon_icon: {
        type: String,
    },
    title: {
        type: String,
    },
    web_icon: {
        type: String,
    },
    slider_Image: {
        type: String,
    },
    slider_heading: {
        type: String,
    },

    slider_subheading: {
        type: String,
    },
    footer_icon: {
        type: String,
    },
    footer: {
        type: String,
    },
    copyright: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default:Date.now
    },
    updatedAt: {
        type: Date,
    }
})

module.exports = mongoose.model('cms', cmsSchema)