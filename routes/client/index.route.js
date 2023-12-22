const homeRoutes = require("./home.route")
const productsRoutes = require("./products.route")
module.exports = (app) => {
    app.use("/home", homeRoutes)
    app.use("/products", productsRoutes)
}