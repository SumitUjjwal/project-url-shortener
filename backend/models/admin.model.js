const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    referrer: String
})

const AdminModel = mongoose.model("admin", adminSchema)

module.exports = { AdminModel }