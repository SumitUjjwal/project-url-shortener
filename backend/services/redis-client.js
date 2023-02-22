const redis=require('redis');



require("dotenv").config();

const client = redis.createClient({
    password: process.env.pass,
    socket: {
        host: 'redis-14486.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: process.env.redPort
    }
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

module.exports = {client};
