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
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

dotenv.config();
const app = express();
//set passport
passportConfig();
app.set('port', process.env.PORT || 8080);
app.enable('trust proxy');
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({force:false})
    .then(() => console.log('success to connect DB'))
    .catch((err) => console.error(err));

if(process.env.NODE_ENV === 'production'){
    app.enable("trust proxy");
    app.use(morgan('combined'));
    app.use(helmet({contentSecurityPolicy: false}));
    app.use(hpp());
}
else{
    app.use(morgan('dev'));
}

const main_page_router = require('./routes');
const user_page_router = require('./routes/user');
const signup_page_router = require('./routes/signup');
const todo_page_router = require('./routes/todo');
const { time } = require('console');

//process.env.NODE_ENV === 'production' ? app.use(morgan('combined')) : app.use(morgan('dev'));
//app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.text({type: "multipart/form-data"}));
app.use(cookie_parser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRETE,
    proxy: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: time.getMilliseconds + (10000 * 60),
    },
    name: 'session-cookie',
}));
//initialize passport object in request message
app.use(passport.initialize());
//save passport information in res.session object
app.use(passport.session());

//express.static(__dirname + 'public')
app.use('/script', express.static('public'));
app.use('/stylesheet', express.static('public'));
app.use('/', main_page_router);
app.use('/login', user_page_router);
app.use('/todo', todo_page_router);
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