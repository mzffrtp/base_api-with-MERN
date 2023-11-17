const express = require("express")

const appRouter = express.Router()

appRouter
    .get("/", (req, res) => {
        res.status(200).json({
            messsage: "Wellcome to main page"
        })
    })


module.exports = appRouter