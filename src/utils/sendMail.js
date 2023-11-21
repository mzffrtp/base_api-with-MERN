const nodemailer = require("nodemailer");

const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Email was not sent", error);
        }
        console.log("info", info);
        return true
    })
}

module.exports = sendMail;