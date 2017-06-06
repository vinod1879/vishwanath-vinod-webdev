(function () {

    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        model.updateProfile = updateProfile;

        init();

        function init() {
            model.userId = $routeParams['uid'];

            fetchProfile();
        }

        function fetchProfile () {

            userService.findUserById(model.userId)
                .then(
                    function (response) {
                        model.user = response.data;
                    }
                )
        }

        function updateProfile() {
            userService.updateUser(model.userId, model.user)
                .then(function() {
                    $location.url('/assignment/user/' + model.user._id + '/website');
                });
        }
    }
})();