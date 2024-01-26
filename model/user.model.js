const mongoose = require('mongoose')
const ramdomString = require("../helpers/generateRamdomString.helper")
const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: ramdomString(30)
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    { timestamps: true }
)

const user = mongoose.model("user", userSchema, 'users')

module.exports = user