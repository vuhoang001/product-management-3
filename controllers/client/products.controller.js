const products = require("../../model/products.model")
const productsHelper = require('../../helpers/products.helper')
const productCategoryModel = require('../../model/products-category.model')
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

//[GET] products/:categoryProduct
module.exports.category = async (req, res) => {
    const slug = req.params.categoryProduct

    const category = await productCategoryModel.findOne({
        deleted: false,
        slug: slug
    })

    const getSubCategory = async (parentID) => {
        const subs = await productCategoryModel.find({
            status: "active",
            deleted: false,
            parent_id: parentID
        })

        let allSubs = [...subs]

        for (const sub of subs) {
            const childs = await getSubCategory(sub.id)
            allSubs = allSubs.concat(childs)
        }

        return allSubs
    }

    const listSubCategory = await getSubCategory(category.id)

    const listSubCategoryID = listSubCategory.map(item => item.id)

    const Product = await products.find({
        deleted: false,
        status: "active",
        parent_id: { $in: [category.id, ...listSubCategoryID] }
    }).sort({ position: 'desc' })

    const newProducts = productsHelper.price(Product)

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    })

}