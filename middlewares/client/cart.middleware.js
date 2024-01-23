const Cart = require('../../model/cart.model')

module.exports.cardID = async (req, res, next) => {

    if (!req.cookies.cartID) {
        const cart = new Cart()
        await cart.save()
        const time = 1000 * 60 * 60 * 24 * 365
        res.cookie("cartID", cart.id, {
            expires: new Date(Date.now() + time)
        })
    }
    next();
}