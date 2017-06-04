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
                        model.message = "User already exists!";
                        $q.reject();
                    },
                    function (response) {
                        var user = {};
                        user.username = username;
                        user.password = password;

                        return userService.createUser(user);
                    }
                )
                .then(
                    function (response) {
                        var user = response.data;
                        $location.url('/assignment/user/' + user._id + '/website');
                    },
                    function (response) {
                        model.message = 'Error occurred! Please try again.';
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


