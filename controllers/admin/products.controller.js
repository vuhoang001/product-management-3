const products = require("../../model/products.model")
const filterButtonHelpers = require("../../helpers/filterButton.helper")
const searchFormHelpers = require("../../helpers/searchForm.helper")
const paginationObjectHelpers = require("../../helpers/pagination.helper")
const Account = require('../../model/accounts.model')
const pathSystem = require("../../config/system")

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

    //Sort
    const sort = {

    }

    if (req.query.sortValue && req.query.sortKey) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    //End sort
    const Products = await products.find(find)
        .sort(sort)
        .limit(paginationObject.limitItems)
        .skip(paginationObject.skip);

    for (const item of Products) {

        const userCreated = await Account.findOne({
            _id: item.createdBy.account_id
        })

        if (userCreated) {
            item.createdBy.fullName = userCreated.fullName
        }
        const userUpdatedID = item.updatedBy.slice(-1)[0];
        if (userUpdatedID) {
            const userUpdated = await Account.findOne({
                _id: userUpdatedID.account_id
            })

            if (userUpdated) {
                item.updatedBy.fullName = userUpdated.fullName
            }
        }

    }


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
    await products.updateOne({ _id: id }, { status: status }, {
        deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date()
        }
    })
    req.flash("success", "Successfully!")
    res.redirect("back")
}

//[PATCH] admin/products/changeMulti 
module.exports.changeMulti = async (req, res) => {

    const type = req.body.type
    const ids = req.body.ids.split(", ")

    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }

    if (type == "active" || type == "inactive") {
        await products.updateMany({ _id: { $in: ids } }, {
            status: type,
            $push: { updatedBy: updatedBy }
        })
        req.flash("success", "Successfully!")
    } else if (type == "delete-all") {
        await products.updateMany({ _id: { $in: ids } }, { deleted: true }, {
            deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date()
            }
        })
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
        // deletedAt: new Date()
        deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date()
        }
    })
    req.flash("success", "Successfully!")
    res.redirect("back")
}

//[GET] admin/products/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Create products"
    })
}


// [POST] admin/products/createPost
module.exports.createPost = async (req, res) => {
    console.log(res.locals.user.id)

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position == "") {
        const count = await products.countDocuments()
        req.body.position = count + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    req.body.createdBy = {
        account_id: res.locals.user.id
    }

    const product = new products(req.body);
    await product.save(product);
    req.flash("success", "Successfully!")
    res.redirect(`/${pathSystem.admin_path}/products`)
}

// [GET] admin/products/edit/:id 
module.exports.edit = async (req, res) => {
    const id = req.params.id
    const Product = await products.findOne({ _id: id })
    res.render("admin/pages/products/edit.pug", {
        pageTitle: "Edit products",
        products: Product
    })
}

// [POST] admin/products/edit/:id 
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    if (req.file && req.file.filename) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }

    await products.updateOne({ _id: id }, {
        ...req.body,
        $push: { updatedBy: updatedBy }
    })
    req.flash("success", "Sucessfuly! ")
    res.redirect(`/${pathSystem.admin_path}/products`)
}

// [GET] admin/products/detail
module.exports.detail = async (req, res) => {
    const id = req.params.id
    const Product = await products.findOne({ _id: id })
    res.render("admin/pages/products/detail.pug", {
        products: Product
    })
}