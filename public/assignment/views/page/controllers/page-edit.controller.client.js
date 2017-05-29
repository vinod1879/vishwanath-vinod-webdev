(function () {

    angular
        .module('WebAppMaker')
        .controller('PageEditController', pageEditController);

    function pageEditController($routeParams, $location, pageService) {

        var model = this;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        init();

        function init() {
            model.page = angular.copy(pageService.findPageById(model.pageId));
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }

})();
