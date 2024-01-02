module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "ERROR!")
        res.redirect("back")
        return;
    }

    if (!req.body.title.length < 5) {
        req.flash("error", "ERROR!")
        res.redirect("back")
        return
    }
    next()
}