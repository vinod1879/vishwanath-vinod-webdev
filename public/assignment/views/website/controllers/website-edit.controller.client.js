(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {

        var model = this;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        init();

        function init() {
            model.website = angular.copy(websiteService.findWebsiteById(model.websiteId));
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.website);
            $location.url('/assignment/user/' + model.userId + '/website');
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/assignment/user/' + model.userId + '/website');
        }
    }

})();
