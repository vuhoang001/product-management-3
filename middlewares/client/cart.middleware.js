const Cart = require('../../model/cart.model')

module.exports.cardID = async (req, res, next) => {

    if (!req.cookies.cartID) {
        const cart = new Cart()
        await cart.save()
        const time = 1000 * 60 * 60 * 24 * 365
        res.cookie("cartID", cart.id, {
            expires: new Date(Date.now() + time)
        })
    } else {
        const ans = req.cookies.cartID
        const carts = await Cart.findOne({
            _id: ans
        })
        carts.totalQuantity = carts.products.reduce((sum, item) => { return sum + item.quantity }, 0)
        res.locals.miniCart = carts
    }



    next();
}