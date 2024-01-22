const products = require("../../model/products.model")
const createTree = require("../../helpers/create-Tree.helper")
const productsCategory = require('../../model/products-category.model')

module.exports.category = async (req, res, next) => {
    const categoryProducts = await productsCategory.find({
        deleted: false
    })

    const newcategoryProducts = createTree(categoryProducts)

    res.locals.layoutCategoryProduct = newcategoryProducts;
    next()
} 