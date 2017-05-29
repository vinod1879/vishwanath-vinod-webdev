(function () {

    angular
        .module('WebAppMaker')
        .service('userService', userService);

    function userService() {

        // API's provided
        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByUsername = findUserByUsername;
        this.findUserByCredentials = findUserByCredentials;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;


        // Helper Functions
        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user)

            return user;
        }

        function findUserByUsername(username) {
            var user = users.find(function(user) {
                return user.username === username;
            });

            if (typeof user === 'undefined') { return null; }

            return user;
        }

        function findUserById(userId) {
            for (var i in users) {
                if (users[i]._id === userId)
                    return users[i];
            }

            return null;
        }

        function findUserByCredentials(username, password) {
            if (username.length > 0 && password.length > 0) {
                for (var i in users) {
                    user = users[i];

                    if (user.username === username && user.password === password) {
                        return user;
                    }
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            var oldUser = findUserById(userId);
            var index = users.indexOf(oldUser);

            users[index] = user;
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);

            users.splice(index, 1);
        }
    }

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

})();
