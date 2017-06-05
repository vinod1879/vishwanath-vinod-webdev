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
            fetchPages();
        }

        function fetchPages() {

            pageService.findPagesByWebsiteId(model.websiteId)
                .then(
                    function(response) {
                        model.pages = response.data;
                    }
                );
        }
    }

})();
