var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function userService(app) {

    app.post('/api/user', createUser);
    app.get('/api/user', findUsers);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/authenticate', authenticate);
    
}
/**
 * User API routing
 */
module.exports = userService;

/**
 * User API route handlers
 */
function createUser(req, res) {

    var user = req.body;

    userModel
        .createUser(user)
        .then(
            function(createdUser) {
                res.json(createdUser);
            },
            function(error) {
                res.send(error);
            });
}

function findUsers (req, res) {

    if (req.query['username']) {

        findUserByUsername(req, res);
    }
    else {
        findAllUsers(req, res);
    }
}

function findUserByUsername (req, res) {

    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                res.json({exists: (user !== null), user: user});
            },
            function (error) {
                res.send(error);
            }
        );
}

function findAllUsers (req, req) {

    userModel
        .findAllUsers()
        .then(
            function(users) {
                res.json(users);
            },
            function (error) {
                res.send(error);
            }
        );
}

function findUserById(req, res) {

    var userId = req.params['userId'];
    
    userModel
        .findUserById(userId)
        .then(
            function (user) {

                if (user) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            },
            function (error) {
                res.send(error);
            }
        );
}

function updateUser(req, res) {

    var user = req.body;
    var userId = req.params['userId'];

    userModel
        .updateUser(userId, user)
        .then(
            function (status) {
                res.send(status);
            },
            function (error) {
                res.send(error);
            }
        );
}

function deleteUser(req, res) {

    var userId = req.params['userId'];
    
    userModel
        .deleteUser(userId)
        .then(
            function (status) {
                res.send(status);
            },
            function (error) {
                res.send(error);
            }
        );
}

function login(req, res) {
    res.json(req.user);
}

function logout(req, res) {
    req.logout();
    res.status(200).json({success: true});
}

function register(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(
            function (user) {
                req.login(user, function (status) {
                    res.send(status);
                });
            },
            function (error) {
                res.sendStatus(401);
            }
        )
}

function authenticate(req, res) {
    if (req.isAuthenticated()) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
}

// HELPER METHODS

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if (user)
                    return done(null, user);
                else
                    return done(null, false, { message: 'Incorrect password.' });
            },
            function (error) {
                return done(error, false);
            }
        );
}

function serializeUser(user, done) {
    done(null, user._id);
}

function deserializeUser(userId, done) {
    userModel
        .findUserById(userId)
        .then(
            function (user) {
                done(null, user);
            },
            function (error) {
                done(error, null);
            }
        );
}
