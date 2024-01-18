const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productsSchema = new mongoose.Schema({
    "title": String,
    "description": String,
    "price": Number,
    "discountPercentage": Number,
    "stock": Number,
    "thumbnail": String,
    "status": String,
    "position": Number,
    slug: { type: String, slug: "title", unique: true },
    "deleted": {
        type: Boolean,
        default: false
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    "deletedAt": Date
}, { timestamps: true }
)

const Products = mongoose.model("Products", productsSchema, "products")

module.exports = Products