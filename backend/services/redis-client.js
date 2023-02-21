const redis = require('redis');

const client = redis.createClient({
    password: 'Qp29D1v2mSAtvQsuQPMZsgqo1FKAN8JA',
    socket: {
        host: 'redis-14258.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14258
    }
});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

module.exports = {
    client
}