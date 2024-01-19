
// [GET] admin/my-account 
module.exports.index = (req, res) => {
    res.render('admin/pages/my-account/index.pug')
}

// [GET] admin/my-account/edit 
module.exports.edit = (req, res) => {
    res.render('admin/pages/my-account/edit.pug')
}