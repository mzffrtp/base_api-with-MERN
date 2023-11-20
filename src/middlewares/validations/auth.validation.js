const joi = require("joi");
const catchAsync = require("../../utils/catchAsync");
const validator = require("validator")


class authValidation {
    constructor() { }
    static register = catchAsync(async (req, res, next) => {
        await joi.object({
            name: joi.string().trim().min(3).max(20).required().messages({
                "string.base": "Name should be a string",
                "string.empty": "Name should not be blank",
                "stiring.min": "Name should have min 3 characters!",
                "string.max": "Name should have max 20 characters!",
                "string.required": "Name should be provided!"
            }),
            lastname: joi.string().trim().min(3).max(20).required().messages({
                "string.base": "Lastname should be a string",
                "string.empty": "Lastname should not be blank",
                "stiring.min": "Lastname should have min 3 characters!",
                "string.max": "Lastname should have max 20 characters!",
                "string.required": "Lastname should be provided!"
            }),
            email: joi.string().email().trim().min(3).max(30).required().messages({
                "string.base": "Email should be a string",
                "string.empty": "Email should not be blank",
                "stiring.min": "Email should have min 3 characters!",
                "string.max": "Email should have max 30 characters!",
                "string.required": "Email should be provided!",
                "string.email": "Please provide a valid email adress."
            }),
            password: joi.string().trim().min(6).max(30).required().messages({
                "string.base": "Password should be a string",
                "string.empty": "Password should not be blank",
                "stiring.min": "Password should have min 6 characters!",
                "string.max": "Password should have max 30 characters!",
                "string.required": "Password should be provided!"
            })
        }).validateAsync(req.body),
            next()
    })
    static login = catchAsync(async (req, res, next) => {
        await joi.object({
            email: joi.string().email().trim().min(3).max(30).required().messages({
                "string.base": "Email should be a string",
                "string.empty": "Email should not be blank",
                "stiring.min": "Email should have min 3 characters!",
                "string.max": "Email should have max 30 characters!",
                "string.required": "Email should be provided!",
                "string.email": "Please provide a valid email adress."
            }),
            password: joi.string().trim().min(6).max(30).required().messages({
                "string.base": "Password should be a string",
                "string.empty": "Password should not be blank",
                "stiring.min": "Password should have min 6 characters!",
                "string.max": "Password should have max 30 characters!",
                "string.required": "Password should be provided!"
            })
        }).validateAsync(req.body),
            next();
    }
    )
};

module.exports = authValidation