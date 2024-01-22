const products = require("../../model/products.model")
const productsHelper = require('../../helpers/products.helper')

// [GET] /products 
module.exports.index = async (req, res) => {


    const productsList = await products.find({
        deleted: false
    }).limit(6)

    const newArray = productsHelper.price(productsList)

    res.render("client/pages/products/index.pug", {
        pageTitle: "Products list",
        products: newArray
    })
}
// [GET] products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug
    const Product = await products.findOne({ slug: slug }, { deleted: false }, { status: "active" }).limit(6)
    res.render("client/pages/products/detail.pug", {
        products: Product
    })
}