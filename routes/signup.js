const express = require('express');
const path = require('path');
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const sanitize = require('sanitize-html');
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
            where: {name: id},
        });
        if(exUser){
            return res.redirect('/signup/?error=same id exist');
        }
        else if(passwd1 !== passwd2){
            return res.redirect('/signup/?error=wrong password');
        }
        sanitize(passwd1);
        const hash = await bcrypt.hash(passwd1, 12);
        sanitize(req.body.id);
        await User.create({
            name: req.body.id,
            passwd: hash
        });
        return res.redirect('/?success=signup success');
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