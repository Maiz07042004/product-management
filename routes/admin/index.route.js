const dashboardRoute = require("./dashboard.route.js")
const productRoute = require("./product.route.js")
const productCategoryRoute = require("./product-category.route.js")
const roleRoute = require("./role.route.js")
const accountRoute = require("./account.route.js")
const authRoute = require("./auth.route.js")
const myAccountRoute = require("./my-account.route.js")
const systemConfig = require("../../config/system.js")
const authMiddleware = require("../../middlewares/admin/auth.middleware.js")
module.exports = (app) => {
    const PATH = systemConfig.prefixAdmin
    app.use(PATH + "/dashboard", authMiddleware.requireAuth, dashboardRoute)

    app.use(PATH + "/products", authMiddleware.requireAuth, productRoute)

    app.use(PATH + "/products-category", authMiddleware.requireAuth, productCategoryRoute)

    app.use(PATH + "/roles", authMiddleware.requireAuth, roleRoute)

    app.use(PATH + "/accounts", authMiddleware.requireAuth, accountRoute)

    app.use(PATH + "/auth", authRoute)

    app.use(PATH + "/my-account", authMiddleware.requireAuth, myAccountRoute)
}