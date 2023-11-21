const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //!trims string
        validate: [validator.isAlpha, "name should include just letters"]
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    passwoordChangeAt: Date,
    reset: {
        code: {
            type: String,
            default: null
        },
        time: {
            type: String,
            default: null
        }
    }
}, { collection: "users", timestamps: true });

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.passwordChangedAfterToken = function (JWTTimestamp) {
    if (this.passwoordChangeAt) {
        const changedTimeStamp = parseInt(this.passwoordChangeAt.getTime() / 1000)
        return JWTTimestamp < changedTimeStamp
    }
    return false
}


const User = mongoose.model("users", userSchema)

module.exports = User