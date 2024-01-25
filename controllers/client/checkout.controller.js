const cartModel = require('../../model/cart.model')
const productModel = require('../../model/products.model')

// [GET] /checkout 
module.exports.index = async (req, res) => {
    const cartID = req.cookies.cartID
    const carts = await cartModel.findOne({
        _id: cartID
    })

    if (carts.products.length > 0) {
        for (const item of carts.products) {
            const productID = item.product_id
            const inforProduct = await productModel.findOne({
                _id: productID
            })

            item.inforProduct = inforProduct
            item.totalPrice = item.quantity * item.inforProduct.price
        }
    }

    carts.totalPrice = carts.products.reduce((sum, item) => sum + item.totalPrice, 0)

    res.render('client/pages/checkout/index.pug',
        {
            pageTitle: "Checkout",
            records: carts
        }
    )
}