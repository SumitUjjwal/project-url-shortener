const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const cookieParser = require('cookie-parser');
const fs = require('fs');
// const { client } = require('../services/redis-client');
const authenticate = async (req, res, next) => {
    try {
        const token = res.locals.normaltoken || req.cookies.normaltoken || req.headers.authorization
        console.log(token)
        const data = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"))
        // const data= await client.LRANGE("blacktok",0,-1)
        if (data.includes(token)) {
            res.send("login again ")
        } else {
            if (token) {
                const decoded = jwt.verify(token, process.env.normalkey)
                if (decoded) {
                    res.locals.userId = decoded.userId;
                    // const userrole=decoded.role
                    // req.headers.userrole=userrole
                    next()
                } else {
                    res.send("again login")
                    console.log("again login")
                }
            } else {
                res.send("again login...")
                console.log("again login..")
            }
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}
module.exports = { authenticate }

