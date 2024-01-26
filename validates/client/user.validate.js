module.exports.resgisterPost = (req, res, next) => {
    if (!req.body.fullName || !req.body.email || !req.body.password) {
        res.redirect('back')
    }
    next()
}