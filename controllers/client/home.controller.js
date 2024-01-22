const productsModel = require('../../model/products.model')
const productsHelper = require('../../helpers/products.helper')
// [GET] /home
module.exports.index = async (req, res) => {
    const productsFeatured1 = await productsModel.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6)

    const newProducts = await productsModel.find({
        deleted: false,
        status: "active"
    }).limit(6)
    const productsFeatured = productsHelper.price(productsFeatured1)

    res.render("client/pages/home/index.pug", {
        productsFeatured: productsFeatured,
        newProducts: newProducts
    })
}