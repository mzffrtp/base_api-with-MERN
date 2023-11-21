const rateLimit = require("express-rate-limit")
const allowedList = ["::ffff:127.0.0.1"]
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req, reset) => {
        console.log("api.url:", req.url);
        console.log("api api:", req.ip);
        if (req.url === "/v1/auth/login" || req.url === "/v1/auth/register") { return 3 }
        else return 10
    },
    message: {
        success: false,
        message: "Too many requests!"
    },
    skip: (req, res) => allowedList.includes(req.ip),
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = apiLimiter