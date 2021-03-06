var express = require('express'),
    app     = express(),
    path    = require('path'),
    morgan  = require('morgan'),
    cookies = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    config  = require('./config');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookies());
app.use(session({secret: config.sessionPassword}));
app.use(passport.initialize());
app.use(passport.session());


require ("./test/app.js")(app);
require ("./assignment/app.js")(app);

// MAIN CATCHALL ROUTE
// =========================================

app.get('*', function(req, res) {

    console.log(req.originalUrl)

    if (req.originalUrl.includes('assignment')) {
        res.sendFile(path.join(__dirname + '/public/assignment/index.html'));
    }
    else {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    }
});

var port = config.port;

app.listen(port);

console.log('Magic happens on port ' + port);
