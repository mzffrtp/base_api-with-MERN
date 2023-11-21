const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const Response = require("../utils/response");
const { creatToken } = require("../middlewares/authJWT");
const catchAsync = require("../utils/catchAsync");

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    //! joi checks if email and password is provided 
    //? orher wise check if email and password is provoded

    const user = await User.findOne({ email }).select("+password")
    !user && next(new AppError("User not registered, please create an account", 401))

    const correctPassword = await bcrypt.compare(password, user.password)

    correctPassword ? new Response("User logedin successfully!").success(res) : next(new AppError("Please provide your email and password", 400))

}

exports.register = catchAsync(async (req, res, next) => {

    const newUser = await User.create(req.body)
    creatToken(newUser, res)

    const { email } = req.body

    const userCheck = await User.findOne({ email })

    if (userCheck) { next(new AppError("Email in used!", 401)) }

    next()

})