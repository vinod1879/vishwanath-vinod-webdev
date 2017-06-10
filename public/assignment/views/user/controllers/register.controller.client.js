(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        function register(username, password, verifyPassword) {

            if (!validate(username, password, verifyPassword)) {
                return;
            }

            userService.findUserByUsername(username)
                .then(
                    function (response) {

                        if (response.data.exists) {
                            model.message = "User already exists!";
                        }
                        else {
                            registerNewUser(username, password);
                        }
                    }
                );
        }

        function registerNewUser (username, password) {

            var user = {};
            user.username = username;
            user.password = password;

            userService.createUser(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $location.url('/assignment/user/' + user._id + '/website');
                    }
                );
        }

        function validate(username, password, verifyPassword) {

            if (!username || !password) {
                model.message = "Username/Password cannot be empty!";
                return false;
            }

            if (password !== verifyPassword) {
                model.message = "Passwords must match!";
                return false;
            }
            return true;
        }
    }

})();


