var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

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
    user._id = (new Date()).getTime() + "";
    user.created = new Date();
    users.push(user);

    sendUserResponse(user, res);
}

function findUsers (req, res) {

    var username = req.query['username'];
    var password = req.query['password'];

    if (username) {

        var user, message;

        if (password) {
            user = findUserByCredentials(username, password);
            message = 'Incorrect username or password';
        }
        else {
            user = findUserByUsername(username);
            message = 'User not found';
        }

        sendUserResponse(user, res, message);
    }
    else {
        res.json(users);
    }
}

function findUserById(req, res) {

    var userId = req.params['userId'];
    var user = users.find(function(user) {
        return user._id === userId;
    });

    sendUserResponse(user, res, 'User not found');
}

function updateUser(req, res) {

    var user = req.body;
    var index = findIndexOfUserId(req.params['userId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        users[index] = user;
        res.sendStatus(200);
    }
}

function deleteUser(req, res) {

    var index = findIndexOfUserId(req.params['userId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        users.splice(index, 1);
        res.sendStatus(200);
    }
}

// Helper Functions

function sendUserResponse(user, res, message) {
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({message: message});
    }
}

function findUserByUsername (username) {

    return users.find(function(user) {
        return user.username === username;
    });
}

function findUserByCredentials (username, password) {

    return users.find(function(user) {
        return user.username === username && user.password === password;
    });
}

function findIndexOfUserId(userId) {

    for(var i in users) {
        if (users[i]._id === userId) {
            return i;
        }
    }

    return -1;
}
