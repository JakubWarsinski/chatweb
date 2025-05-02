exports.getUserFromSession = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.locals.user = req.session.user;
    }

    return null;
}