const dashboardRouter = require("./dashboard.route")
const productsRouter = require("./products.route");
const productsCategoryRouter = require('./products-category.route')
const permissionsRouter = require('./role.route')
const system = require("../../config/system")

module.exports = (app) => {
    app.use(`/${system.admin_path}/dashboard`, dashboardRouter)
    app.use(`/${system.admin_path}/products`, productsRouter)
    app.use(`/${system.admin_path}/products-category`, productsCategoryRouter)
    app.use(`/${system.admin_path}/roles`, permissionsRouter)
}

