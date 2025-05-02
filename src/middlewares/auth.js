function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    return res.redirect('/user');
}

module.exports = { isAuthenticated };