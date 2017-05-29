(function () {

    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['uid'];

        model.user = userService.findUserById(model.userId);
    }
})();