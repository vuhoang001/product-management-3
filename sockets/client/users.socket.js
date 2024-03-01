const userModel = require('../../model/user.model')

module.exports = async (res) => {
    _io.once('connection', (socket) => {
        socket.on('client_add_friend', async (clientUser) => {
            const myUser = res.locals.user.id;
            // Thêm id của A vào acceptFriends của B 
            const existUser = await userModel.findOne({
                _id: clientUser,
                acceptFriends: myUser
            })

            if (!existUser) {
                await userModel.updateOne({
                    _id: clientUser
                }, {
                    $push: { acceptFriends: myUser }
                })
            }
            // Thêm id của b vào requestFriends của A
            const existUserBinA = await userModel.findOne({
                _id: myUser,
                requestFriends: clientUser
            })

            if (!existUserBinA) {
                await userModel.updateOne({
                    _id: myUser
                }, {
                    $push: { requestFriends: clientUser }
                })
            }
        })

        socket.on('client_cancel_friend', async (data) => {
            const myUser = res.locals.user.id
            const existUser = await userModel.findOne({
                _id: myUser,
                requestFriends: data
            })

            if (existUser) {
                await userModel.updateOne({
                    _id: myUser
                }, {
                    $pull: { requestFriends: data }
                })
            }

            const AinB = await userModel.findOne({
                _id: data,
                acceptFriends: myUser
            })
            if (AinB) {
                await userModel.updateOne({
                    _id: data
                }, {
                    $pull: { acceptFriends: myUser }
                })
            }
        })

        socket.on('client_decline_friend', async (data) => {
            const userID = res.locals.user.id

            await userModel.updateOne({
                _id: userID
            }, {
                $pull: { acceptFriends: data }
            })

            await userModel.updateOne({
                _id: data
            }, {
                $pull: { requestFriends: userID }
            })
        })

        socket.on('client_accept_friend', async (data) => {
            userID = res.locals.user.id
            await userModel.updateOne({
                _id: userID
            }, {
                $pull: { acceptFriends: data },
                $push: {
                    friendsList: {
                        user_id: data,
                        room_chat_id: ""
                    }
                }
            })

            await userModel.updateOne({
                _id: data
            }, {
                $pull: { requestFriends: userID },
                $push: {
                    friendsList: {
                        user_id: userID,
                        room_chat_id: ""
                    }
                }
            })
        })

        socket.on('client_unfriend_friend', async (data) => {
            const userID = res.locals.user.id
            await userModel.updateOne({
                _id: userID
            }, {
                $pull: { friendsList: { user_id: data } }
            })

            await userModel.updateOne({
                _id: data
            }, {
                $pull: { friendsList: { user_id: userID } }
            })
        })
    })
}