const cartModel = require('../../model/cart.model')
const productModel = require('../../model/products.model')
// [POST] cart/add/:product_id 
module.exports.index = async (req, res) => {
    const productID = req.params.product_id
    const quantity = parseInt(req.body.quantity)
    const cartID = req.cookies.cartID
    const cart = await cartModel.findOne({
        _id: cartID
    })
    const existedInCart = cart.products.find(item => item.product_id == productID)
    if (existedInCart) {
        const newQuantity = existedInCart.quantity + quantity
        await cartModel.updateOne(
            {
                _id: cartID,
                'products.product_id': productID
            },
            {
                'products.$.quantity': newQuantity
            }
        )
    } else {
        const cartObject = {
            product_id: productID,
            quantity: quantity
        }
        await cartModel.updateOne({
            _id: cartID
        }, {
            $push: { products: cartObject }
        })
    }
    res.redirect("back")
}


// [GET] /cart
module.exports.cart = async (req, res) => {
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
    res.render('client/pages/cart/index.pug', {
        pageTitle: "Cart",
        records: carts
    })

}

// GET /cart/delete/:product_id
module.exports.delete = async (req, res) => {
    const cartID = req.cookies.cartID
    const productID = req.params.productID
    await cartModel.updateOne({
        _id: cartID
    }, {
        "$pull": { products: { "product_id": productID } }
    })
    res.redirect("back")
}

module.exports.changeQuantity = async (req, res) => {
    const productID = req.params.productID
    const quantity = parseInt(req.params.quantity)
    const cartID = req.cookies.cartID

    await cartModel.updateOne(
        {
            _id: cartID,
            'products.product_id': productID
        },
        {
            $set: { 'products.$.quantity': quantity }
        }
    );

    res.redirect('back')
}