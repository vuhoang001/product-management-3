const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const generate = require('../helpers/generateRamdomString.helper')
const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate(30)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    "deleted": {
        type: Boolean,
        default: false
    },
    "deletedAt": Date
}, { timestamps: true }
)

const Account = mongoose.model("Account", accountSchema, "accounts")

module.exports = Account