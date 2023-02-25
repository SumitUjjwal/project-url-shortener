const express = require('express');
// const { client } = require("../services/redis-client");
const { ShortUrlModel } = require("../models/short.model");
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const sdk = new SuperfaceClient();
const p = require('ua-parser');
require("dotenv").config();

const shortRouter = express.Router();
shortRouter.use(express.json());

shortRouter.post("/", async (req, res) => {
    // console.log(req.headers);
    const full = req.body.full;
    // const userId = res.locals.userId;
    const userId = req.headers.userid;
    console.log(userId, full);
    // res.json({userId, full});
    try {
        const shorturl = new ShortUrlModel({ full, userId });
        await shorturl.save();
        const data = await ShortUrlModel.findOne({ full });
        // console.log(data);
        res.json({ "msg": `short url created successfully: baseUrl/${data.short}`, "response": "ok" });
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting short route" });
    }
})

shortRouter.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    // const userId = res.locals.userId;
    try {
        const data = await ShortUrlModel.find({ userId });

        const browsers = await ShortUrlModel.aggregate([
            { $match: { userId: userId } },
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
            { $match: { userId: userId } },
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
            { $match: { userId: userId } },
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
            { $match: { userId: userId } },
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
            { $match: { userId: userId } },
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
            { $match: { userId: userId } },
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
            { $match: { userId: userId } },
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
            { $match: { userId: userId } },
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
        console.log(date)
        res.json({ data, links, fullLinks, clicks, date, devices, location, system, browsers });
        // res.json(data);
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting user details" });
    }
})

shortRouter.get("/:short", async (req, res) => {
    const userAgent = req.headers['user-agent'];
    const browser = p.parseUA(userAgent).toString().split(" ")[0];
    const short = req.params.short;
    const clientDevice = req.device.type.toLowerCase();
    const clientPlatform = p.parseOS(userAgent).toString() || req.useragent.platform
    const date = new Date();
    const options = { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateString = date.toLocaleDateString('en-IN', options);
    try {
        const clientIp = req.ip;
        const urlData = await ShortUrlModel.findOne({ short });
        const count = urlData.clicks;
        const id = urlData._id;
        // console.log(urlData.devices);

        const updateCount = await ShortUrlModel.findByIdAndUpdate(id, { clicks: count + 1 });

        // location from IP
        const profile = await sdk.getProfile('address/ip-geolocation@1.0.1');
        const result = await profile
            .getUseCase('IpGeolocation')
            .perform({
                ipAddress: "2405:201:3:811e:6478:423b:3922:4966" //`${clientIp}` 
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
            // data.addressRegion = "private";
            console.log(data.addressRegion, id);
            await ShortUrlModel.findByIdAndUpdate(id, { $push: { regions: data.addressRegion, devices: clientDevice, platform: clientPlatform, date: dateString, browser: browser } });
            // await ShortUrlModel.findByIdAndUpdate(id, { $push: { devices: clientDevice} });
            console.log("Updated")
            // res.send(data.addressRegion || null);
        } catch (error) {
            // console.error(error);
        }
        res.redirect(urlData.full);
        // const data = await ShortUrlModel.findOne({ id });
        // res.json({ "msg": `getting full url: ${data}`, "response": "ok" });
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting full url" });
    }
})

shortRouter.delete("/delete/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const delete_link = await ShortUrlModel.findByIdAndDelete({ _id });
        res.json({ "msg": "link deleted sucessfully", "response": "ok" });
    } catch (error) {
        console.log(error);
        res.json({ "msg": "error in deleting link " + error.message })
    }
})

module.exports = {
    shortRouter
}