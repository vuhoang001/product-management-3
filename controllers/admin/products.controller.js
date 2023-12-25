const products = require("../../model/products.model")
module.exports.index = async (req, res) => {
    const Products = await products.find({
        deleted: false
    })
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Products Admin", 
        products: Products
    })
}