module.exports = function (req, res, next) {
    if (!req.session.isWOLoggedIn) {
        return res.redirect('/wo/login');
    }
    next();
}
