const express = require("express");
const upload = require("../assets/multerLib/upload");
const multer = require("multer");
const AppError = require("../utils/appError");
const Response = require("../utils/response");
const authRouter = require("./auth.routes");

const musterRouer = express.Router()

musterRouer.post("/upload", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError)
            new AppError("Sth. wrong with Multer:", err)
        else if (err)
            new AppError("sth. wrong when uploading", err)
        else return new Response(req.savedImages, "Uploaded!").success(res)
    })
})

module.exports = musterRouer