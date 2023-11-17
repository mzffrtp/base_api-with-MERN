const express = require("express");
const app = express();
const dotenv = require("dotenv").config() //!


var morgan = require("morgan");
const appRouter = require("./routes/appRoutes");

app.use(morgan("dev"))
app.use((req, res, next) => {
    req.requestTime = new Date().toDateString();
    next();
})

//routes
app.use("/api/v1", appRouter)

module.exports = app