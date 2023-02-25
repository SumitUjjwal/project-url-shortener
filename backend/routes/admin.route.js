const express = require('express');

const { AdminModel } = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const adminRouter = express.Router();
adminRouter.use(express.json());

const ADMIN_NORMAL_TOKEN_SECRET_KEY = process.env.NORMAL_TOKEN_SECRET_KEY;
const ADMIN_NORMAL_TOKEN_EXPIRE_TIME = process.env.NORMAL_TOKEN_EXPIRE_TIME;
const ADMIN_REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;
const ADMIN_REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME;

adminRouter.get("/", async (req, res) => {
    res.send("accessing admin");
})

adminRouter.post("/create", async (req, res) => {
    const { name, email, password, referrer } = req.body;
    const checkReferrer = await AdminModel.findOne({ _id: referrer });
    if (checkReferrer) {
        bcrypt.hash(password, 2, async (err, hash) => {
            if (hash) {
                const user = new UserModel({ name, email, password, referrer });
                await user.save();
                res.json({ "msg": `${name} has been registered successfully!!` });
            }
            else {
                res.json({ "msg": err });
            }
        })
    }
    else {
        res.json({ "msg": "Access denied" });
    }
});

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        console.log(user);
        if(user){
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                       const token = jwt.sign({ userID: user._id, role: user.role }, ADMIN_NORMAL_TOKEN_SECRET_KEY, { expiresIn: ADMIN_NORMAL_TOKEN_EXPIRE_TIME });
                       const refresh_token = jwt.sign({ userID: user._id, role: user.role }, ADMIN_REFRESH_TOKEN_SECRET_KEY, { expiresIn: ADMIN_REFRESH_TOKEN_EXPIRE_TIME });
                       res.cookie("token", token, { httpOnly: true });
                       res.cookie("refresh_token", refresh_token, { httpOnly: true, maxAge: ADMIN_REFRESH_TOKEN_EXPIRE_TIME });
                       res.json({ "msg": `${user.name} has logged in successfully!!` });
                }
                else {
                       res.json({ "msg": "Invalid credentials", "error": err });
                }
         })
        }
    } catch (error) {

    }
});

module.exports = {
    adminRouter
}