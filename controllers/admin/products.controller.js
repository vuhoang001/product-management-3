const products = require("../../model/products.model")
module.exports.index = async (req, res) => {
    const filterButton = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active", 
            status: "active", 
            class: ""
        }, 
        {
            name: "Inactive", 
            status: "inactive", 
            class: ""
        }
    ]

    if(req.query.status){
        const index = filterButton.findIndex((item) => {
            return item.status == req.query.status
        })
        filterButton[index].class = "active"
    } else {
        const index = filterButton.findIndex((item) => {
            return item.status == ""
        })
        filterButton[index].class = "active"
    }

    const find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status
    }
    const Products =await products.find(find);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Products Admin",
        products: Products, 
        filterButtons: filterButton
    })
}