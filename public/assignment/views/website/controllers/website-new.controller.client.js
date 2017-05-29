(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', websiteNewController);

    function websiteNewController($routeParams, $location, websiteService) {

        var model = this;
        model.createWebsite = createWebsite;

        model.userId = $routeParams['uid'];
        model.website = {};

        init();

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }

        function createWebsite() {
            websiteService.createWebsite(model.userId, model.website);
            $location.url('/assignment/user/' + model.userId + '/website');
        }
    }

})();
