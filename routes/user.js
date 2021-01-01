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
        //console.log(authError, user, info);
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            //return res.send('error');
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            //return res.render('personal', {user: req.body.id});
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
        //res.sendFile(path.join(__dirname, '../views/todo.html'));
        res.render('todo', {user: req.user.name});
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/', (req, res, next) => {
    //console.log('a');
    try{
        res.send('hi');
        //res.redirect('../../');
    }
    catch(err){
        console.error(err);
        next(err);
    }
}); 

router.get('/mypage', isLoggedIn, (req, res, next) => {
    //console.log(req.user.id);
    try{
        //console.log(req.user);
        res.render('personal', {user: req.user.name});
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;