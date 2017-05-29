(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;

        model.userId = $routeParams['uid'];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            console.log ("Websites Found: " + model.websites.length);
        }
        init();

    }

})();
