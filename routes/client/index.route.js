const homeRoutes = require("./home.route")
const productsRoutes = require("./products.route")
const searchRouters = require("./search.route")
const categoryMiddleware = require('../../middlewares/client/category.middleware')
const cartMiddleware = require('../../middlewares/client/cart.middleware')
const cartRouters = require("./cart.route")
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cardID)
    app.use("/home", homeRoutes)
    app.use("/products", productsRoutes)
    app.use("/search", searchRouters)
    app.use("/cart", cartRouters)
}