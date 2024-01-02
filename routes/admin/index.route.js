const dashboardRouter = require("./dashboard.route")
const productsRouter = require("./products.route");
const system = require("../../config/system")

module.exports = (app) => {
    app.use(`/${system.admin_path}/dashboard`, dashboardRouter)
    app.use(`/${system.admin_path}/products`, productsRouter)
}

