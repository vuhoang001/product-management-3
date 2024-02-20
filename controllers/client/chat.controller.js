// [GET] /chat 
module.exports.index = (req, res) => {
    // Socket io 
    _io.on('connection', (socket) => {
        console.log('a user connected');
    });
    // End socket io 
    res.render("client/pages/chat/index.pug",)
}