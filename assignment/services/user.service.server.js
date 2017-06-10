var userModel = require('../model/user/user.model.server');

function userService(app) {

    app.post('/api/user', createUser);
    app.get('/api/user', findUsers);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
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

        if (req.query['password']) {
            findUserByCredentials(req, res);
        }
        else {
            findUserByUsername(req, res);
        }
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

function findUserByCredentials (req, res) {

    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({message: 'Invalid Username/Password!'});
                }
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
