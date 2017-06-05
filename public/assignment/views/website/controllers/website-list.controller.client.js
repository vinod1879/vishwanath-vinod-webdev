(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;

        init();

        function init() {
            model.userId = $routeParams['uid'];
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
    }

})();
