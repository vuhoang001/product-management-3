const homeRoutes = require("./home.route")
const productsRoutes = require("./products.route")
const categoryMiddleware = require('../../middlewares/client/category.middleware')
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use("/home", homeRoutes)
    app.use("/products", productsRoutes)
}