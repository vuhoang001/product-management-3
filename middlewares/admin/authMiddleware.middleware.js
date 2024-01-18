const system = require('../../config/system')
const Accout = require('../../model/accounts.model')
module.exports.requireAuth = async (req, res, next) => {

    if (!req.cookies.token) {
        res.redirect(`/${system.admin_path}/dashboard`)
        return;
    }

    const user = await Accout.findOne({ token: req.cookies.token })

    if (req.cookies.token != user.token) {
        res.redirect(`/${system.admin_path}/dashboard`)
        return;
    }

    next()
}