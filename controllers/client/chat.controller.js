const chatModel = require('../../model/chat.model')
const userModel = require('../../model/user.model')
// [GET] /chat 
module.exports.index = async (req, res) => {
    const userID = res.locals.user.id
    const fullName = res.locals.user.fullName
    // Socket io 
    _io.once('connection', (socket) => {
        socket.on('client_send_message', async (msg) => {
            const chat = new chatModel({
                user_id: userID,
                content: msg
            })
            await chat.save()

            _io.emit('server_return_message', {
                fullName: fullName,
                userID: userID,
                content: msg
            })
        })
    });
    // End socket io 

    const chats = await chatModel.find({
        deleted: false
    })
    for (const chat of chats) {
        const userInfor = await userModel.findOne({
            _id: chat.user_id
        }).select('fullName')
        chat.userInfor = userInfor
    }
    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats
    })
}