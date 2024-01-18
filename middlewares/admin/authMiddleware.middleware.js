const system = require('../../config/system')
const Accout = require('../../model/accounts.model')
const Role = require('../../model/role.model')
module.exports.requireAuth = async (req, res, next) => {

    if (!req.cookies.token) {
        res.redirect(`/${system.admin_path}/dashboard`)
        return;
    }

    const user = await Accout.findOne({ token: req.cookies.token })
    const role = await Role.findOne({ _id: user.role_id }).select("title permissions")
    if (req.cookies.token != user.token) {
        res.redirect(`/${system.admin_path}/dashboard`)
        return;
    }

    res.locals.user = user
    res.locals.role = role
    next()
}