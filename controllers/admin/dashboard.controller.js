// [GET] /admin/dashboard
const categories = require('../../model/products-category.model')
const products = require('../../model/products.model')
const admin = require('../../model/accounts.model')
const client = require('../../model/user.model')

module.exports.index = async (req, res) => {
    const categoryQuantity = await categories.countDocuments({ deleted: false })
    const categoryActive = await categories.countDocuments({ status: 'active' })
    const categoryInactive = await categories.countDocuments({ status: 'inactive' })

    const productQuantity = await products.countDocuments({ deleted: false })
    const productActive = await products.countDocuments({ status: 'active' })
    const productInactive = await products.countDocuments({ status: 'inactive' })

    const adminQuantity = await admin.countDocuments({ deleted: false })
    const adminActive = await admin.countDocuments({ status: 'active' })
    const adminInactive = await admin.countDocuments({ status: 'inactive' })

    const userQuantity = await client.countDocuments({ deleted: false })
    const userActive = await client.countDocuments({ status: 'active' })
    const userInactive = await client.countDocuments({ status: 'inactive' })
    const value = {
        category: {
            quantity: categoryQuantity,
            active: categoryActive,
            inactive: categoryInactive
        },
        product: {
            quantity: productQuantity,
            active: productActive,
            inactive: productInactive
        },
        admin: {
            quantity: adminQuantity,
            active: adminActive,
            inactive: adminInactive
        },
        client: {
            quantity: userQuantity,
            active: userActive,
            inactive: userInactive
        }
    }


    res.render(`admin/pages/dashboard/index.pug`, {
        record: value
    })
}