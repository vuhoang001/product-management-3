const Role = require('../../model/role.model')
const pathSystem = require("../../config/system")
// [GET] admin / roles
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false,
    })
    res.render('admin/pages/roles/index', {
        pageTitle: 'Permission list',
        records: records
    })
}

// [GET] admin/roles/create 
module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create', {
        pageTitle: 'Create permission'
    })
}

// [POST] admin/roles/createPost 
module.exports.createPost = async (req, res) => {
    const records = new Role(req.body)
    await records.save()
    req.flash('success', 'Successfully !')
    res.redirect(`/${pathSystem.admin_path}/roles`)
}