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
        console.log(authError, user, info);
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.send('error');
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.render('personal', {user: req.body.id});
        });
    })(req, res, next);
});

router.get('/', (req, res, next) => {
    try{
        res.redirect('/');
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/mypage', isLoggedIn, (req, res, next) => {
    console.log(req.sessionID);
})

module.exports = router;