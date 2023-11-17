const express = require("express")
const { login, register } = require("../controllers/auth.controller");

const authRouter = express.Router()

authRouter
    .post("/", (req, res) => {
        res.status(200).json({
            messsage: "Wellcome to auth  page"
        })
    })

authRouter.post("/login", login)
authRouter.post("/register", register)
/*
authRouter
    .route("/login")
    .post(login)
    */
module.exports = authRouter