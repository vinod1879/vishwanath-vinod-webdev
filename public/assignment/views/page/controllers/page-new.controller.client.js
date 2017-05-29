(function () {

    angular
        .module('WebAppMaker')
        .controller('PageNewController', pageNewController);

    function pageNewController($routeParams, $location, pageService) {

        var model = this;
        model.createPage = createPage;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.page = {};

        init();

        function init() {

        }

        function createPage() {
            pageService.createPage(model.websiteId, model.page);
            $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }

})();
