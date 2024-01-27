const mongoose = require('mongoose')

const forgetSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 180
        }
    }, { timestamps: true }
)


const forget = new mongoose.model('forgetPassword', forgetSchema, 'forget-password')

module.exports = forget