const settingModel = require('../../model/setting.model')
// [GET] admin/setting/general
module.exports.index = async (req, res) => {
    const record = await settingModel.findOne()
    res.render('admin/pages/setting/general.pug',
        {
            pageTitle: "Create information",
            record: record
        }
    )
}

// [POST] admin/setting/general
module.exports.add = async (req, res) => {
    const setting = new settingModel(req.body)
    await setting.save()
    res.redirect('/admin/setting/general')
}