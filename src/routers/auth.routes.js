const express = require("express")
const { login, register, forgotPassword } = require("../controllers/auth.controller");
const authValidation = require("../middlewares/validations/auth.validation");
const { protectedMe, tokenCheck } = require("../middlewares/authJWT");
const cors = require("cors")
const authRouter = express.Router()

authRouter
    .post("/", (req, res) => {
        res.status(200).json({
            messsage: "Wellcome to auth  page"
        })
    })

authRouter.post("/login", authValidation.login, login)
authRouter.post("/register", authValidation.register, register)
authRouter.get("/me", tokenCheck, protectedMe)
authRouter.post("/forgotPassword", forgotPassword)



module.exports = authRouter