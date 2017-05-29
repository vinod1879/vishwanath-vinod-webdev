(function () {

    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;
        model.updateProfile = updateProfile;

        model.userId = $routeParams['uid'];
        console.log("Updatd!!")

        model.user = userService.findUserById(model.userId);

        function updateProfile() {
            userService.updateUser(model.userId, model.user);
            $location.url('/assignment/user/' + model.user._id + '/website');
        }
    }
})();