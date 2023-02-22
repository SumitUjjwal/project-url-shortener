const express = require('express');
const { client } = require("../services/redis-client");
const { ShortUrlModel } = require("../models/short.model");
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const sdk = new SuperfaceClient();

require("dotenv").config();

const shortRouter = express.Router();
shortRouter.use(express.json());

shortRouter.post("/", async (req, res) => {
    console.log(req);
    const full = req.body.full;
    const userId = res.locals.userId;
    console.log(userId);
    try {
        const shorturl = new ShortUrlModel({ full, userId });
        await shorturl.save();
        const data = await ShortUrlModel.findOne({ full });
        console.log(data);
        res.json({ "msg": `short url created successfully: baseUrl/${data.short}`, "response": "ok" });
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting short route" });
    }
})

shortRouter.get("/:short", async (req, res) => {
    const short = req.params.short;
    const clientDevice = req.device.type.toLowerCase();
    const clientPlatform = req.useragent.platform
    console.log(req.useragent.platform)
    try {
        const clientIp = req.ip;
        const urlData = await ShortUrlModel.findOne({ short });
        const count = urlData.clicks;
        const id = urlData._id;
        // if(clientDevice == urlData.devices.desktop){
        // urlData.devices.desktop+1;
        // }
        // else if(clientDevice == urlData.devices.phone){
        // urlData.devices.phone+1;
        // }
        // else if(clientDevice == urlData.devices.tv){
        // urlData.devices.tv+1;
        // }
        // else{
        // urlData.devices.other+1;
        // }
        // urlData.devices+1
        console.log(urlData.devices);

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
            await ShortUrlModel.findByIdAndUpdate(id, { $push: { regions: data.addressRegion, devices: clientDevice, platform: clientPlatform} });
            // await ShortUrlModel.findByIdAndUpdate(id, { $push: { devices: clientDevice} });
            console.log("Updated")
            // res.send(data.addressRegion || null);
        } catch (error) {
            // console.error(error);
        }
        // res.redirect(urlData.full);
        const data = await ShortUrlModel.findOne({ id });
        res.json({ "msg": `getting full url: ${data}`, "response": "ok" });
    } catch (error) {
        console.error(error);
        res.json({ "msg": "error getting full url" });
    }
})

module.exports = {
    shortRouter
}