const AppError = require("../utils/appError")

const errorHnadlerMiddleware = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode || 400)
            .json({
                success: false,
                message: err.message
            })
    }

    return res.status(500).json({
        success: false,
        message: "There is sth. wrong with the server, please try again later!"
    })
};

module.exports = errorHnadlerMiddleware