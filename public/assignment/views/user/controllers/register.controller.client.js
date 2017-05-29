(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        this.register = register;

        model.message = '';

        function register(username, password, verifyPassword) {

            if (!username || !password) {
                model.message = "Username/Password cannot be empty!";
                return;
            }

            if (password !== verifyPassword) {
                model.message = "Passwords must match!";
                return;
            }

            var user = userService.findUserByUsername(username, password);

            if (user !== null) {
                model.message = "User already exists!";
                return;
            }
            else {

                var user = {};
                user.username = username;
                user.password = password;

                user = userService.createUser(user);
                $location.url('/assignment/user/' + user._id + '/website');
            }
        }
    }

})();