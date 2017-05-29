(function () {

    angular
        .module('WebAppMaker')
        .controller('PageListController', pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
    }

})();
