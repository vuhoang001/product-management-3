const dashboardRouter = require("./dashboard.route")
const productsRouter = require("./products.route");
const productsCategoryRouter = require('./products-category.route')
const permissionsRouter = require('./role.route')
const accountsRouter = require('./accounts.route')
const authRouter = require('./auth.router')
const myAccountRouter = require('./my-account.route')
const settingRouter = require('./setting.route')
const authMiddleware = require('../../middlewares/admin/authMiddleware.middleware')
const system = require("../../config/system")


module.exports = (app) => {
    app.use(`/${system.admin_path}/dashboard`, authMiddleware.requireAuth, dashboardRouter)
    app.use(`/${system.admin_path}/products`, authMiddleware.requireAuth, productsRouter)
    app.use(`/${system.admin_path}/products-category`, authMiddleware.requireAuth, productsCategoryRouter)
    app.use(`/${system.admin_path}/roles`, authMiddleware.requireAuth, permissionsRouter)
    app.use(`/${system.admin_path}/accounts`, authMiddleware.requireAuth, accountsRouter)
    app.use(`/${system.admin_path}/auth`, authRouter)
    app.use(`/${system.admin_path}/setting`, authMiddleware.requireAuth, settingRouter)
    app.use(`/${system.admin_path}/my-account`, authMiddleware.requireAuth, myAccountRouter)
}

