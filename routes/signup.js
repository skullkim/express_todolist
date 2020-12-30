const express = require('express');
const path = require('path');
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
express.urlencoded({extended: true});

const router = express.Router();

router.get('/', (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, '../views/signup.html'));
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/check-signup', async (req, res, next) => {
    const {id, passwd1, passwd2} = req.body;
    try{
        const exUser = await User.findOne({
            where: {id},
        });
        //console.log(exUser);
        if(exUser){
            return res.render('check_signup', {success_signup: 'wrongId'});
        }
        else if(passwd1 !== passwd2){
            return res.render('check_signup', {success_signup: 'worngPassword'});
        }
        const hash = await bcrypt.hash(passwd1, 12);

        //await User.create() error
        await User.create({
            name: req.body.id,
            passwd: hash
        });
        return res.render('check_signup', {success_signup: 'success'});
    }
    catch(err){
        console.error(err);
        return next(err);
    }
});

router.get('/main-page', (req, res, next) => {
    try{
        res.redirect('../');
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;