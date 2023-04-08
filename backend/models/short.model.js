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
    date: [{
        type: String
    }],
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
    }],
    browser: [{
        type: String,
        default: "all"
    }],
    createdAt: {
        type: String,
        default: () => {
            const date = new Date();
            const month = date.getMonth() + 1;
            return month.toString();
        }
    }
})

const ShortUrlModel = mongoose.model("shorturl", shortUrlSchema)

module.exports = {
    ShortUrlModel
}