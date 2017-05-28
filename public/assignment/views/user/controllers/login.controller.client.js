(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        this.login = login;

        function login(username, password) {

            if (!username || !password) {
                model.message = "Username/Password cannot be empty!"
                return;
            }

            var user = userService.findUserByCredentials(username, password);

            if (user !== null) {
                $location.url('/assignment/user/' + user._id);
            }
            else {
                model.message = "Sorry! Incorrect username or password.";
            }
        }
    }

})();