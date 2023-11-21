const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const Response = require("../utils/response");
const { creatToken } = require("../middlewares/authJWT");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const moment = require("moment")

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

});

exports.forgotPassword = catchAsync(
    async (req, res, next) => {
        const { email } = req.body

        const userWantPass = await User.findOne({ email })

        if (!userWantPass) { return next(new AppError("No account found for this email user", 400)) }

        //!token for resetting password should be encrypted
        const resetToken = userWantPass.creatPasswordResetToken();
        await userWantPass.save({ validateBeforeSave: false })


        await sendMail({
            from: "test@outlook.com",
            to: userWantPass.email,
            subject: "Reset Password",
            text: `Reset Password Code ${resetCode}`
        })


        await User.updateOne(
            { email },
            {
                reset: {
                    code: resetCode,
                    time: moment(new Date())
                        .add(2.15, "hour")
                        .format("YYYY-MM-DD HH:mm:ss")
                }
            }
        )

        return new Response(true, "Please check you mail box").success(res)
    }
)

exports