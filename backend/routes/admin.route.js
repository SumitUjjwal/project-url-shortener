const express = require('express');

const { AdminModel } = require("../models/admin.model");
const { UserModel } = require("../models/user.model");
const { ShortUrlModel } = require("../models/short.model");
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
    const searchCategory = req.query.category;
    const searchTerm = req.query.term;
    console.log(searchCategory, searchTerm)
    if (searchCategory == "_id") {
        const info = await UserModel.find({ _id: searchTerm });
        console.log(info)
        console.log(searchCategory, searchTerm)
        res.json(info);
    }
    else if (searchCategory == "email") {
        const info = await UserModel.find({ email: { $regex: searchTerm, $options: "i" } });
        console.log(info)
        console.log(searchCategory, searchTerm)
        res.json(info);
    }
    else if (searchCategory == undefined || "name") {
        const info = await UserModel.find({ name: { $regex: searchTerm, $options: "i" } });
        console.log(info)
        res.json(info);
    }
})

adminRouter.post("/create", async (req, res) => {
    const { name, email, password, referrer } = req.body;
    const checkReferrer = await AdminModel.findOne({ _id: referrer });
    if (checkReferrer) {
        const checkExisting = await AdminModel.findOne({ email });
        if (checkExisting) {
            res.json({ "msg": "Already registered" });
        }
        else {
            bcrypt.hash(password, 2, async (err, hash) => {
                console.log(hash)
                if (hash) {
                    const user = new AdminModel({ name, email, password: hash, referrer });
                    await user.save();
                    res.json({ "msg": `${name} has been registered successfully!!` });
                }
                else {
                    res.json({ "msg": err });
                }
            })
        }
    }
    else {
        res.json({ "msg": "Access denied" });
    }
});

adminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AdminModel.findOne({ email });
        console.log(user);
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    // const token = jwt.sign({ userID: user._id, role: user.role }, process.env.NORMAL_TOKEN_SECRET_KEY);
                    // const refresh_token = jwt.sign({ userID: user._id, role: user.role }, process.env.NORMAL_TOKEN_SECRET_KEY);
                    // res.cookie("token", token, { httpOnly: true });
                    // res.cookie("refresh_token", refresh_token, { httpOnly: true, maxAge: ADMIN_REFRESH_TOKEN_EXPIRE_TIME });
                    res.json({ "msg": `${user.name} has logged in successfully!!`, "admin": user._id });
                }
                else {
                    res.json({ "msg": "Invalid credentials", "error": err });
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while admin login", "error": error })
    }
});

adminRouter.get("/getUsersInfo", async (req, res) => {
    try {
        const data = await UserModel.find({});

        const browsers = await ShortUrlModel.aggregate([
            {
                $unwind: '$browser'
            },
            {
                $group: {
                    _id: '$browser',
                    count: { $sum: 1 }
                }
            }
        ]);

        const clicks = await ShortUrlModel.aggregate([
            {
                $unwind: '$clicks'
            },
            {
                $group: {
                    _id: '$clicks',
                    count: { $sum: 1 }
                }
            }
        ]);

        const date = await ShortUrlModel.aggregate([
            {
                $unwind: '$date'
            },
            {
                $group: {
                    _id: '$date',
                    count: { $sum: 1 }
                }
            }
        ]);

        const fullLinks = await ShortUrlModel.aggregate([
            {
                $unwind: '$full'
            },
            {
                $group: {
                    _id: '$full',
                    count: { $sum: 1 }
                }
            }
        ]);

        const links = await ShortUrlModel.aggregate([
            {
                $unwind: '$short'
            },
            {
                $group: {
                    _id: '$short',
                    count: { $sum: 1 }
                }
            }
        ]);

        const devices = await ShortUrlModel.aggregate([
            {
                $unwind: '$devices'
            },
            {
                $group: {
                    _id: '$devices',
                    count: { $sum: 1 }
                }
            }
        ]);

        const location = await ShortUrlModel.aggregate([
            {
                $unwind: '$regions'
            },
            {
                $group: {
                    _id: '$regions',
                    count: { $sum: 1 }
                }
            }
        ]);

        const system = await ShortUrlModel.aggregate([
            {
                $unwind: '$platform'
            },
            {
                $group: {
                    _id: '$platform',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json({ data, links, fullLinks, clicks, date, devices, location, system, browsers });
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting client details" });
    }
})

module.exports = {
    adminRouter
}