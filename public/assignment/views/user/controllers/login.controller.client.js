(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        this.login = login;

        function login(username, password) {

            if (validate(username, password)) {

                userService.findUserByCredentials(username, password)
                    .then(
                        function(response) {

                            console.log('Success!');
                            var user = response.data;
                            $location.url('/assignment/user/' + user._id + '/website');

                    },
                        function(response) {

                            model.message = response.data.message;
                    });
            }
        }

        function validate(username, password) {

            if (!username || !password) {
                model.message = "Username/Password cannot be empty!";
                return false;
            }
            return true;
        }
    }

})();