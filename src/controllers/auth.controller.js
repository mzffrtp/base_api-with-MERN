const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const Response = require("../utils/response");

exports.login = async (req, res) => {

    return res.json(res.body)
}

exports.register = async (req, res, next) => {
    //TODO digerine bak burasi farkli
    const { email } = req.body

    const userCheck = await User.findOne({ email })

    userCheck && next(new AppError("Email in used!", 401))

    //TODO db gitmeden hashlemeyi unutma
    req.body.password = await bcrypt.hash(req.body.password, 12)


    const newUser = new User(req.body)
    await newUser.save()
        .then((data) => {
            return new Response(data, "user added successfully").created(res)
        })
        .catch(() => {
            return next(new AppError("User not added!, 400",))
        })

}