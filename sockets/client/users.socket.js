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
    })
}