const products = require("../../model/products.model")
const filterButtonHelpers = require("../../helpers/filterButton.helper")
const searchFormHelpers = require("../../helpers/searchForm.helper")
const paginationObjectHelpers = require("../../helpers/pagination.helper")
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
    
    //Pagination
    let paginationInit = {
        currentPage: 1, 
        limitItems: 4
    }
    totalItems = await products.countDocuments(find);
    let paginationObject = paginationObjectHelpers(paginationInit, req.query, totalItems)
    //End pagination
    const Products = await products.find(find).limit(paginationObject.limitItems).skip(paginationObject.skip);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Products Admin",
        products: Products, 
        filterButtons: filterButton, 
        keyWord: searchForm.keyword, 
        pagination: paginationObject
    })
}