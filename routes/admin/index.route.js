const dashboardRouter = require("./dashboard.route")
const productsRouter = require("./products.route");
const productsCategoryRouter = require('./products-category.route')
const permissionsRouter = require('./role.route')
const accountsRouter = require('./accounts.route')
const authRouter = require('./auth.router')
const system = require("../../config/system")

module.exports = (app) => {
    app.use(`/${system.admin_path}/dashboard`, dashboardRouter)
    app.use(`/${system.admin_path}/products`, productsRouter)
    app.use(`/${system.admin_path}/products-category`, productsCategoryRouter)
    app.use(`/${system.admin_path}/roles`, permissionsRouter)
    app.use(`/${system.admin_path}/accounts`, accountsRouter)
    app.use(`/${system.admin_path}/auth`, authRouter)
}

