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
            if (!model.page.name) { model.message = '* Page name is required'; return; }
            pageService.createPage(model.websiteId, model.page)
                .then(function (response) {
                    $location.url('/assignment/website/' + model.websiteId + '/page');
                });
        }
    }

})();
