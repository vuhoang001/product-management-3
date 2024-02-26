const chatModel = require('../../model/chat.model')
const userModel = require('../../model/user.model')
const uploadToCloudinary = require('../../helpers/uploadCloudinary')
// [GET] /chat 
module.exports.index = async (req, res) => {
    const userID = res.locals.user.id
    const fullName = res.locals.user.fullName
    // Socket io 
    _io.once('connection', (socket) => {
        socket.on('client_send_message', async (data) => {
            // uploadImageWithPreview
            const images = []
            for (const image of data.images) {
                const link = await uploadToCloudinary(image)
                images.push(link)
            }
            // End uploadImageWithPreview
            const chat = new chatModel({
                user_id: userID,
                content: data.content,
                images: images
            })
            await chat.save()

            _io.emit('server_return_message', {
                fullName: fullName,
                userID: userID,
                content: data.content,
                images: images
            })
        })

        // typing 
        socket.on('send_action_typing_to_server', (type) => {
            socket.broadcast.emit('send_action_typing_to_client', {
                userID: userID,
                fullName: fullName,
                content: type
            })
        })
        // end typing 
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