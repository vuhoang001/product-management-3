module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "ERROR!")
        res.redirect("back")
        return;
    }

    if (req.body.title.length < 6) {
        req.flash("error", "ERROR 1")
        res.redirect("back")
        return;
    }
    next();
}