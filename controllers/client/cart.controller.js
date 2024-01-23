const cartModel = require('../../model/cart.model')
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