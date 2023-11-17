require("express-async-errors")
const express = require("express");
const app = express();
const dotenv = require("dotenv").config() //!
var morgan = require("morgan");
const appRouter = require("./src/routers/appRoutes");
const authRouter = require("./src/routers/auth.routes");
const AppError = require("./src/utils/appError");
const errorHnadlerMiddleware = require("./src/middlewares/errorHandler");

app.use(morgan("dev"))
app.use((req, res, next) => {
    req.requestTime = new Date().toDateString();
    next();
})
app.use(express.json())
//routes
app.use("/api/v1", appRouter)
app.use("/api/v1/auth", authRouter)

//! undefined route - error management
app.all("*", (req, res, next) => {
    next(new AppError("Undefined path, pls check your url!"), 404)
})

//! app error management
app.use(errorHnadlerMiddleware);

module.exports = app