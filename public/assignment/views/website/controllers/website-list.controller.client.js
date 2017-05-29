(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
    }

})();
