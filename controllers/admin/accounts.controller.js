const Accounts = require('../../model/accounts.model')
const Role = require('../../model/role.model')
const systemConfig = require('../../config/system')
const md5 = require('md5')

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    const records = await Accounts.find({
        deleted: false
    })
    for (const item of records) {
        const role = await Role.findOne({ _id: item.role_id })
        item.role = role
    }
    res.render('admin/pages/accounts/index', {
        records: records
    })
}

module.exports.create = async (req, res) => {
    const RoleRecords = await Role.find({
        deleted: false
    })
    res.render('admin/pages/accounts/create.pug', {
        recordRole: RoleRecords
    }

    )
}

module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password)
    const record = new Accounts(req.body)
    await record.save()
    req.flash('success', 'Successfully !')
    res.redirect(`/${systemConfig.admin_path}/accounts`)
}

module.exports.edit = async (req, res) => {
    const id = req.params.id
    const record = await Accounts.findOne({
        _id: id
    })
    res.render('admin/pages/accounts/edit.pug', {
        record: record
    })
}


