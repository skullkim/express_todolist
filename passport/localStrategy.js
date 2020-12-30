const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new local_strategy({
        usernameField: 'id',
        passwordField: 'passwd',
    }, async(id, passwd, done) => {
        try{
            const ex_user = await User.findOne({
                where: {name: id},
            });
            if(ex_user){
                //console.log(passwd, ex_user.passwd);
                const result = await bcrypt.compare(passwd, ex_user.passwd);
                result ? done(null, ex_user) : done(null, false, {message: 'wrong password'});
            }
            else{
                done(null, false, {message: 'Did not signup yet'});
            }
        }
        catch(err){
            console.error(err);
            done(err);
        }
    }));
};