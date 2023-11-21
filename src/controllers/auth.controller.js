const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const Response = require("../utils/response");
const { creatToken, createTemporaryToken } = require("../middlewares/authJWT");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const moment = require("moment");
const { time } = require("console");

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

        if (!userWantPass) next(new AppError("Unvalid user", 400))

        const resetCode = crypto.randomBytes(3).toString("hex")
        console.log(resetCode);

        /*
        await sendMail({
            from: "test@outlook.com",
            to: userWantPass.email,
            subject: "Reset Password",
            text: `Reset Password Code ${resetCode}`
        })
        */

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

exports.resetCodeCheck = catchAsync(
    async (req, res) => {
        const { email, code } = req.body

        const user = await User.findOne({ email }).select("_id name lastname email reset")

        if (!user) { next(new AppError("Invalid user account", 401)) }

        const dbTime = moment(user.reset.time);
        const currentTime = moment(new Date());
        const timeDiff = dbTime.diff(currentTime, "minutes");

        console.log("time diff--->", time);

        if (timeDiff <= 0 || !user.reset.code === code) { next(new AppError("Invalid code", 401)) }

        const temporaryToken = await createTemporaryToken(user._id, user.email)

        return new Response(temporaryToken, "You can reset your password").success(res)

    }
)