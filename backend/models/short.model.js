const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = mongoose.Schema({
    full: {
        type: String
    },
    short: {
        type: String,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        default: 0
    },
    regions: [{
        type: String,
        default: "all"
    }],
    userId: {
        type: String
    },
    devices: [{
        type: String,
        default: "all"
    }], 
    platform: [{
        type: String,
        default: "all"
    }]

})

const ShortUrlModel = mongoose.model("shorturl", shortUrlSchema)

module.exports = {
    ShortUrlModel
}