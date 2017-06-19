var mongoose = require('mongoose'),
    userSchema = require('./user.schema.server'),
    userModel = mongoose.model('UserModel', userSchema),
    bcrypt = require('bcrypt-nodejs');


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.findUserByGoogleId = findUserByGoogleId;

/**
 * Exports
 */
module.exports = userModel;

function createUser(user) {
    if (user.password) {
        user.password = bcrypt.hashSync(user.password);
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {

    return userModel.findOne({username: username})
        .select('password')
        .then(
            function (user) {

                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        user.password = null;
                        return user;
                    }
                }
                return null;
            }
        );
}

function findAllUsers() {
    return userModel.find();
}

function updateUser(userId, user) {
    delete user.username;
    delete user.password;

    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(websiteId) {
    userModel
        .find({websites:websiteId})
        .then(
            function (users) {
                for (var i in users) {
                    var user = users[i];
                    var index = user.websites.indexOf(websiteId);
                    user.websites.splice(index, 1);

                    user.save();
                }
            });
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}
