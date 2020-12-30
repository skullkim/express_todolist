const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const passport = require('passport');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const {sequelize} = require('./models');
const passportConfig = require('./passport');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
//set passport
passportConfig();
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({force:false})
    .then(() => console.log('success to connect DB'))
    .catch((err) => console.error(err));

const main_page_router = require('./routes');
const user_page_router = require('./routes/user');
const signup_page_router = require('./routes/signup');
const { time } = require('console');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRETE,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: time.getMilliseconds + (1000 * 60),
    },
    name: 'session-cookie',
}));
//initialize passport object in request message
app.use(passport.initialize());
//save passport information in res.session object
app.use(passport.session());

//express.static(__dirname + 'public')
app.use('/script', express.static('public'));
//console.log(__filename);
app.use('/', main_page_router);
app.use('/login', user_page_router);
app.use('/signup/', signup_page_router);


app.use((req, res, next) => {
    const error = new Error(`main ${req.method} ${req.url} router doesn't exit`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} start server`);
});