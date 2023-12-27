const products = require("../../model/products.model")
const filterButtonHelpers = require("../../helpers/filterButton.helper")
const searchFormHelpers = require("../../helpers/searchForm.helper")
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    
    // Filter button 
    const filterButton = filterButtonHelpers(req.query)
    if(req.query.status){
        find.status = req.query.status
    }
    // End filter button 

    
    // Submit Search
    const searchForm = searchFormHelpers(req.query)
    if(req.query.keyword){
        find.title = searchForm.regex
    }
    // End submit search
    
    const Products = await products.find(find);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Products Admin",
        products: Products, 
        filterButtons: filterButton, 
        keyWord: searchForm.keyword
    })
}