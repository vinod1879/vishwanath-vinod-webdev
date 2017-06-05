(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', websiteNewController);

    function websiteNewController($routeParams, $location, websiteService) {

        var model = this;
        model.createWebsite = createWebsite;

        init();

        function init() {

            model.userId = $routeParams['uid'];
            model.website = {};
            fetchWebsites();
        }

        function fetchWebsites() {
            websiteService.findWebsitesByUser(model.userId)
                .then(
                    function (response) {
                        model.websites = response.data;
                    }
                );
        }

        function createWebsite() {
            websiteService.createWebsite(model.userId, model.website)
                .then(function (response) {
                    $location.url('/assignment/user/' + model.userId + '/website');
                });
        }
    }

})();
