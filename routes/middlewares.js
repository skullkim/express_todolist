exports.isLoggedIn = (req, res, next) => {
    //return req.isAuthenticated() ? next() : res.status(403).send('you have to login');
    return req.isAuthenticated() ? next () : res.redirect('/?error=you have to login first');
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }
    else{
        const message = encodeURIComponent('you already logged in');
        res.redirect(`/?error=${message}`);
    }
};