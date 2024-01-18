const Account = require('../../model/accounts.model')
const systemConfig = require('../../config/system')
const md5 = require('md5')
//[GET] admin/auth/login
module.exports.login = (req, res) => {
    res.render('admin/pages/auth/login.pug')
}

//[POST] admin/auth/loginPost
module.exports.loginPost = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await Account.findOne({ email: email }, { deleted: false })
    if (user) {
        if (user.password == md5(password)) {
            res.cookie("token", user.token)
            res.redirect(`/${systemConfig.admin_path}/dashboard`)
        } else {
            res.redirect('back')
        }
    } else {
        res.redirect('back')
    }
}


// [GET] admin/auth/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("token")
    res.redirect(`/${systemConfig.admin_path}/auth/login`)
}
