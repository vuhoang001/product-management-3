const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    "title": String,
    "description": String, 
    "price": Number, 
    "discountPercentage": Number, 
    "stock": Number,
    "thumbnail": String, 
    "status": String, 
    "position": Number
})

const Products = mongoose.model("Products", productsSchema, "products")

module.exports = Products