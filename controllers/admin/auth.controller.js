const Account = require('../../model/accounts.model')
const systemConfig = require('../../config/system')
const md5 = require('md5')
module.exports.login = (req, res) => {
    res.render('admin/pages/auth/login.pug')
}

module.exports.loginPost = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await Account.findOne({ email: email }, { deleted: false })
    if (user) {
        if (user.password == md5(password)) {
            res.cookie("token", user.token)
            res.redirect(`/${systemConfig.admin_path}/dashboard`)
        }
    } else {
        res.redirect('back')
    }
}