(function () {

    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService, currentUser) {

        var model = this;
        model.updateProfile = updateProfile;
        model.logout = logout;

        init();

        function init() {

            model.userId = currentUser._id;
            model.user = currentUser;
        }
        
        function logout() {
            console.log('Logging out...');
            userService.logout()
                .then(
                    function (response) {
                        $location.url('/assignment/login');
                    }
                )
        }

        function updateProfile() {
            userService.updateUser(model.userId, model.user)
                .then(function() {
                    $location.url('/assignment/website');
                });
        }
    }
})();