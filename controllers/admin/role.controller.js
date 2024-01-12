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

// [GET] admin/roles/edit/:id 
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const record = await Role.findOne({ _id: id, deleted: false })
    res.render('admin/pages/roles/edit', {
        pageTitle: 'Edit permission',
        data: record
    })
}

// [PATCH] admin/roles/editPatch/:id 
module.exports.editPatch = async (req, res) => {
    const id = req.params.id

    await Role.updateOne({ _id: id }, req.body)

    req.flash('success', 'Successfully !')
    res.redirect(`/${pathSystem.admin_path}/roles`)
}

// [GET] admin/roles/permissions 
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })
    res.render('admin/pages/roles/permissions', {
        pageTitle: 'Permissions',
        data: records
    })
}


// [PATCH] admin/roles/permissionsPatch 
module.exports.permissionsPatch = async (req, res) => {
    const permission = JSON.parse(req.body.permissionsInput)
    for (const item of permission) {
        await Role.updateOne(
            {
                _id: item.id
            },
            {
                permissions: item.permissions
            }
        )
    }
    req.flash('success', 'succesfully !')
    res.redirect('back')
}

