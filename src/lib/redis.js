const redis = require('async-redis');

let client;

class Redis{
    constructor(){}

    init(){
        client = redis.createClient({
            'host': process.env.REDIS_HOST
        });
    }

    async setValue(key, value) {
        return client.set(key, value);
    }

    async getValue(key) {
        const value = await client.get(key);
        return value;
    }

    async delValue(key) {
        const value = await client.del(key);
        return value;
    }
}

const redisClient = new Redis();


module.exports = {
    redisClient
}
