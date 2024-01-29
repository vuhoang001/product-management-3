const userModel = require('../../model/user.model')

module.exports.requireAuth = async (req, res, next) => {

    if (!req.cookies.tokenUser) {
        res.redirect(`/user/login`)
        return;
    }

    const user = await userModel.findOne(
        {
            tokenUser: req.cookies.tokenUser
        }
    )
    if (!user) {
        res.redirect(`/user/login`)
        return;
    }

    next()
}