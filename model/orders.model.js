const mongoose = require('mongoose')

const orderSchema = new Schema(
    {
        // cart_id: String,
        userInfor: {
            fullName: String,
            phone: String,
            address: String
        },
        products: [
            {
                product_id: String,
                price: Number,
                discountPercentage: Number,
                quantity: Number
            }
        ]
    }, { timestamps: true }
)

const order = mongoose.model("order", orderSchema, "orders")

module.exports = order