const cartModel = require('../../model/cart.model')
const productModel = require('../../model/products.model')
const orderModel = require("../../model/orders.model")
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

// [POST] checkout/order 
module.exports.order = async (req, res) => {
    const cartID = req.cookies.cartID
    const userInfor = req.body

    const cart = await cartModel.findOne(
        {
            _id: cartID
        }
    )

    let products = []
    for (const item of cart.products) {
        const objectProducts = {
            product_id: item.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: item.quantity
        }

        const productInfo = await productModel.findOne(
            {
                _id: item.product_id
            }
        )
        objectProducts.price = productInfo.price
        objectProducts.discountPercentage = productInfo.discountPercentage
        products.push(objectProducts)

    }

    const objectOrder = {
        cart_id: cartID,
        userInfor: userInfor,
        products: products
    }


    const order = new orderModel(objectOrder)
    await order.save()

    await cartModel.updateOne(
        {
            _id: cartID
        }, {
        products: []
    }
    )

    res.send(`checkout/success/${order.id}`)

}