const productsModel = require("../../model/products.model")
// [GET] products/search 
module.exports.search = async (req, res) => {
    const query = req.query.keyword
    const search = new RegExp(query, "i")
    const result = await productsModel.find({
        status: "active",
        deleted: false,
        title: search
    })

    res.render('client/pages/search/index.pug', {
        records: result,
        keyword: query
    })
}