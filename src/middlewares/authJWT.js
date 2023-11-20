const jwt = require("jsonwebtoken")
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/user.model");
const Response = require("../utils/response");

const creatToken = async (user, res) => {

    const jwtPayload = {
        sub: user._id,
        name: user.name
    };

    const jwtToken = await jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return res.status(200).json({
        status: "success",
        message: "user succesfully added!",
        jwtToken,
        data: { user }
    })

}

const tokenCheck = catchAsync(
    async (req, res, next) => {

        //! token exits or reachable
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }

        !token && next(new AppError("Please login to your account!", 400))

        //! token valid?, expired?
        await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) next(new AppError("unvalid token!", 401))

            const userInDB = await User.findById(decoded.sub).select("_id name lastname email password")
            console.log(userInDB);

            //! uer exits after JWT
            !userInDB && next(new AppError("Unvalid Token", 401))

            //! password changed after jwt prowided
            if (userInDB.passwordChangedAfterToken(userInDB.iat)) {
                //TODO check here !!!???
                console.log("userInDB.iat--->", userInDB.iat);
                return new AppError("You changed your password in a while, please log in again", 401)
            }
            req.user = userInDB
            next()
        })

    }
)

const protectedMe = async (req, res, next) => {
    return new Response(req.user).success(res)
}
module.exports = {
    creatToken, tokenCheck, protectedMe
}