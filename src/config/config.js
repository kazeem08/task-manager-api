
const config = {
    port: process.env.PORT,
    jwt: process.env.JWT_SECRET_KEY,
    mongo: process.env.MONGODB_URL,
    redis: process.env.REDIS_HOST,
    mail: {
        host: process.env.MAIL_HOST,
        pass: process.env.MAIL_PASSWORD,
        user: process.env.MAIL_USER,
        service: process.env.MAIL_SERVICE
    }
}


module.exports = config;