const express = require('express');
const { client } = require("../services/redis-client");
const { ShortUrlModel } = require("../models/short.model");
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const sdk = new SuperfaceClient();
require("dotenv").config();

const shortRouter = express.Router();
shortRouter.use(express.json());

shortRouter.post("/", async (req, res) => {
    const full = req.body.full;
    try {
        const shorturl = new ShortUrlModel({ full });
        await shorturl.save();
        const data = await ShortUrlModel.findOne({ full });
        res.json({ "msg": `short url created successfully: baseUrl/${data.short}` });
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting short route" });
    }
})

shortRouter.get("/:short", async (req, res) => {
    const short = req.params.short;
    try {
        const clientIp = req.ip;
        const fullurl = await ShortUrlModel.findOne({ short });
        const count = fullurl.clicks;
        const id = fullurl._id;
        const updateCount = await ShortUrlModel.findByIdAndUpdate(id, { clicks: count + 1 });

        // location from IP
        const profile = await sdk.getProfile('address/ip-geolocation@1.0.1');
        const result = await profile
            .getUseCase('IpGeolocation')
            .perform({
                ipAddress: `${clientIp}`
            }, {
                provider: 'ipdata',
                security: {
                    apikey: {
                        apikey: '8e85c786d18a7d3e24a4758db83d0ad1f25e90525ef0152a74f81709'
                    }
                }
            });
        try {
            const data = result.unwrap();
            console.log(data.addressRegion);
            // await ShortUrlModel.findByIdAndUpdate(id, { $push: { regions: data.addressRegion  } });
            res.send(data.addressRegion || null);
        } catch (error) {
            console.error(error);
        }


        // res.redirect(fullurl.full);
        res.json({ "msg": `getting full url: ${fullurl.full}` });
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting short route" });
    }
})

module.exports = {
    shortRouter
}