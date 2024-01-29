const userModel = require('../../model/user.model')

module.exports.inforUser = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await userModel.findOne(
            {
                tokenUser: req.cookies.tokenUser,
                status: 'active',
                deleted: false
            }
        ).select("-password")

        if (user) {
            res.locals.user = user
        }
    }
    next()
}

