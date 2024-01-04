const mongoose = require("mongoose");
require("dotenv").config();

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Connected successfully!");
    } catch (error) {
        console.log("Connection failed!")
        console.log(error)
    }
}