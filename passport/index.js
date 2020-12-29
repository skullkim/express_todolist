const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    //login시 실행, 세션 객체에 무엇을 넣을지 정한다. 
    passport.serializeUser((user, done) => {
        //done(에러 발생시 사용, 저장하고 싶은 데이터)
        done(null, user.id);
    });

    //매 요청시 실행, passport.session 미들웨어가 이를 호출
    //세션에 저장한 아이디를 통해 사용자 정보 객체를 불러온다. 
    // (serializeUser의 done의 두번쨰 인자, ) =>{}
    passport.deserializeUser((id, done) => {
        User.findOne({where: {id}})
            //req.user에 저장
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    local();
};