const userModel = require('../../model/user.model')
const usersSocket = require('../../sockets/client/users.socket')
module.exports.notFriend = async (req, res) => {
    const userID = res.locals.user.id
    usersSocket(res)

    const myUser = await userModel.findOne({
        _id: userID
    })

    const requestFriends = myUser.requestFriends
    const acceptFriends = myUser.requestFriends

    const users = await userModel.find({
        //  $ne: Not equal
        $and: [
            { _id: { $ne: userID } },
            { _id: { $nin: requestFriends } },
            { _id: { $nin: acceptFriends } }
        ]
        ,
        status: 'active',
        deleted: false
    }).select("avatar fullName")

    res.render('client/pages/users/not-friend', {
        pageTitle: "Users list",
        users: users
    })

}


// [GET] users/request
module.exports.request = async (req, res) => {
    const userID = res.locals.user.id
    const myUser = await userModel.findOne({
        _id: userID
    })
    usersSocket(res)
    const requestFriends = myUser.requestFriends
    const friendUser = await userModel.find({
        _id: { $in: requestFriends },
        status: "active",
        deleted: false
    }).select("avatar fullName id")
    res.render('client/pages/users/request', {
        pageTitle: "Invitation sent",
        users: friendUser
    })
}

// [GET] users/accept 
module.exports.requestFriend = async (req, res) => {
    const userID = res.locals.user.id
    const myUser = await userModel.findOne({
        _id: userID
    })
    usersSocket(res)


    const acceptFriends = myUser.acceptFriends
    const users = await userModel.find({
        _id: { $in: acceptFriends }
    })


    res.render('client/pages/users/accept.pug', {
        pageTitle: "Friends request",
        users: users
    })
}

// [GET] users/friend 
module.exports.friend = async (req, res) => {
    const userID = res.locals.user.id
    const myUser = await userModel.findOne({
        _id: userID
    })
    usersSocket(res)
    const arrayID = []
    for (const id of myUser.friendsList) {
        arrayID.push(id.user_id)
    }

    const users = await userModel.find({
        _id: { $in: arrayID }
    })

    res.render('client/pages/users/friends.pug', {
        pageTitle: "Friends",
        users: users
    })
}