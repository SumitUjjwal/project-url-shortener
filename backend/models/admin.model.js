const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name: String,
    pass: String,
    email: String,
    referrer: String
})

const AdminModel = mongoose.model("admin", adminSchema)

module.exports = { AdminModel }