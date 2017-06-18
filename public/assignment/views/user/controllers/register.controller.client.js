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

            var user = {username: username, password: password};

            userService.register(user)
                .then(
                    function (response) {
                        $location.url('/assignment/profile');
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


