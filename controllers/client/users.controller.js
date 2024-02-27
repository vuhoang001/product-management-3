const userModel = require('../../model/user.model')

module.exports.notFriend = async (req, res) => {
    const userID = res.locals.user.id
    const users = await userModel.find({
        //  $ne: Not equal
        _id: { $ne: userID },
        status: 'active',
        deleted: false
    }).select("avatar fullName")

    res.render('client/pages/users/not-friend', {
        pageTitle: "Users list",
        users: users
    })

}