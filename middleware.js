module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/');
    }
    next();
}

module.exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'You must be signed in first!');
    res.redirect('/api/v1/users/login')
}

module.exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('error', 'You are already signed in!');
        return res.redirect('/');
    }
    next()
}
