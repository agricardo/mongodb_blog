const port = process.env.PORT || 9111;
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const database = require('./database')();

require('./app/passport')(passport);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.set('view engine', 'ejs');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9111');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.set('trust proxy', 1);
app.use(session({
    secret:'secret',
    resave: false,
    saveUninialized: true,
    cookie: {
        secure: false
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.static(__dirname + "/assets"));
require('./app/routes')(app, passport);
app.listen(port, function (err){
    if(err) return console.log('error', err);
    console.log("server listenig on port" + port);
});