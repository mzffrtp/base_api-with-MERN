const AppError = require("../utils/appError")

const errorHnadlerMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error"

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
    console.log(err.stack);

}

module.exports = errorHnadlerMiddleware

