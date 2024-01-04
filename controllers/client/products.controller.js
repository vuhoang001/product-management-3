const products = require("../../model/products.model")
// [GET] /products 
module.exports.index = async (req, res) => {
    const productsList = await products.find({
        deleted: false
    })

    const newArray = productsList.map((item) => {
        item.price = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(2)
        return item;
    })

    res.render("client/pages/products/index.pug", {
        pageTitle: "Products list",
        products: newArray
    })
}
// [GET] products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug
    const Product = await products.findOne({ slug: slug }, { deleted: false }, { status: "active" })
    res.render("client/pages/products/detail.pug", {
        products: Product
    })
}