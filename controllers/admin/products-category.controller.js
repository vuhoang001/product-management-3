const productsCategory = require("../../model/products-category.model")
const createTreeHelpers = require('../../helpers/create-Tree.helper')
const filterButton = require('../../helpers/filterButton.helper')
const system = require("../../config/system")
// [GET] admin/products-category
module.exports.index = async (req, res) => {

    const find = {
        deleted: false
    }

    // filter 
    const filter = filterButton(req.query)
    if (req.query.status) {
        find.status = req.query.status
    }
    // end-filter 


    const records = await productsCategory.find(find)

    const newRecords = createTreeHelpers(records)
    res.render('admin/pages/products-category/index', {
        pageTitle: 'Products category',
        filter: filter,
        category: newRecords
    })
}


// [GET] admin/products-category/create 
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }


    const records = await productsCategory.find(find)

    const newRecords = createTreeHelpers(records)

    res.render('admin/pages/products-category/create', {
        pageTitle: 'Create new category',
        records: newRecords
    })
}

// [GET] admin/products-category/createPost
module.exports.createPort = async (req, res) => {
    console.log(req.body)
    if (req.body.position == "") {
        const count = await productsCategory.countDocuments()
        req.body.position = count + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }
    const category = new productsCategory(req.body)
    await category.save()
    req.flash("success", "Sucessfully ! ")
    res.redirect(`/${system.admin_path}/products-category`)
}


// [GET] admin/products-category/edit/:id 
module.exports.edit = async (req, res) => {
    let find = {
        deleted: false
    }
    find._id = req.params.id
    const record = await productsCategory.find(find)
    res.render('admin/pages/products-category/edit.pug', {
        pageTitle: 'Edit category',
        record: record
    })
}


// [PATCH] admin/products-category/change-status/:status/:id 
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id
    const status = req.params.id
    await productsCategory.updateOne({ _id: id }, { status: status })
    req.flash("success", "Successfully!")
    res.redirect('back')
}