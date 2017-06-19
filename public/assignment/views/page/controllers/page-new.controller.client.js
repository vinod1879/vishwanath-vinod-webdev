(function () {

    angular
        .module('WebAppMaker')
        .controller('PageNewController', pageNewController);

    function pageNewController($routeParams, $location, pageService) {

        var model = this;
        model.createPage = createPage;

        init();

        function init() {

            model.websiteId = $routeParams['wid'];
            model.page = {};
        }

        function createPage() {
            pageService.createPage(model.websiteId, model.page)
                .then(function (response) {
                    $location.url('/assignment/website/' + model.websiteId + '/page');
                });
        }
    }

})();
