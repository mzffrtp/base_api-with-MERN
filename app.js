require("express-async-errors")
const express = require("express");
const app = express();
const dotenv = require("dotenv").config() //!
var morgan = require("morgan");
const appRouter = require("./src/routers/appRoutes");
const authRouter = require("./src/routers/auth.routes");
const AppError = require("./src/utils/appError");
const errorHnadlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOprtions");
const mongoSanitize = require("express-mongo-sanitize")
const path = require("path");
const musterRouer = require("./src/routers/muster.routes");

app.use(morgan("dev"))
app.use((req, res, next) => {
    req.requestTime = new Date().toDateString();
    next();
})
app.use(express.json())

//import public and uploads files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname))

//cors
//! app.use(cors(corsOptions))

// mongoSanitize
app.use(
    mongoSanitize({
        replaceWith: '_',
    }),
);
//routes
app.use("/api/v1", appRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/me", authRouter)
app.use("/api/v1/muster", musterRouer)


//! undefined route - error management
app.all("*", (req, res, next) => {
    next(new AppError("Undefined path, pls check your url!"), 404)
})

//! app error management
app.use(errorHnadlerMiddleware)

module.exports = app