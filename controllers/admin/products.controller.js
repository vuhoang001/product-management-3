const products = require("../../model/products.model")
const filterButtonHelpers = require("../../helpers/filterButton.helper")
const searchFormHelpers = require("../../helpers/searchForm.helper")
const paginationObjectHelpers = require("../../helpers/pagination.helper")

// [GET] admin/products
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    // Filter button 
    const filterButton = filterButtonHelpers(req.query)
    if (req.query.status) {
        find.status = req.query.status
    }
    // End filter button 


    // Submit Search
    const searchForm = searchFormHelpers(req.query)
    if (req.query.keyword) {
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
    const Products = await products.find(find)
        .sort({ position: "asc" })
        .limit(paginationObject.limitItems)
        .skip(paginationObject.skip);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Products Admin",
        products: Products,
        filterButtons: filterButton,
        keyWord: searchForm.keyword,
        pagination: paginationObject
    })
}

//[PATCH] admin/products/change-status/:status/:id

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id
    await products.updateOne({ _id: id }, { status: status })
    req.flash("success", "Successfully!")
    res.redirect("back")
}

//[PATCH] admin/products/changeMulti 

module.exports.changeMulti = async (req, res) => {

    const type = req.body.type
    const ids = req.body.ids.split(", ")
    if (type == "active" || type == "inactive") {
        await products.updateMany({ _id: { $in: ids } }, { status: type })
        req.flash("success", "Successfully!")
    } else if (type == "delete-all") {
        await products.updateMany({ _id: { $in: ids } }, { deleted: true }, { deletedAt: new Date() })
        req.flash("success", "Successfully!")
    } else if (type == "change-position") {
        for (const item of ids) {
            const [id, position] = item.split("-")
            await products.updateOne({ _id: id }, { position: position })
        }
        req.flash("success", "Successfully!")
    }
    res.redirect("back")
}

//[DELETE] admin/products/delete/:id

module.exports.delete = async (req, res) => {
    const id = req.params.id

    await products.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    req.flash("success", "Successfully!")
    res.redirect("back")
}