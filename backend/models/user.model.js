const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    pass: String,
    email: String
})

const UserModel = mongoose.model("users", userSchema)

module.exports = { UserModel }