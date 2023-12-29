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