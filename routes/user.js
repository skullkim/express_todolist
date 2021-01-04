const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use(express.urlencoded({extended: true}));

router.post('/', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/login/mypage');
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

router.post('/todo', isLoggedIn, (req, res) => {
    try{
        res.render('todo', {user: req.user.name});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/', (req, res, next) => {
    try{
        res.send('hi');
    }
    catch(err){
        console.error(err);
        next(err);
    }
}); 

router.get('/mypage', isLoggedIn, (req, res, next) => {
    try{
        res.render('personal', {user: req.user.name});
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;