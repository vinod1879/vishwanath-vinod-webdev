(function () {

    angular
        .module('WebAppMaker')
        .controller('PageEditController', pageEditController);

    function pageEditController($routeParams, $location, pageService) {

        var model = this;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        init();

        function init() {

            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];

            fetchPage();
            fetchPages();
        }
        
        function fetchPage () {

            pageService.findPageById(model.pageId)
                .then(
                    function (response) {
                        model.page = response.data;
                    }
                )
            
        }

        function fetchPages() {

            pageService.findPagesByWebsiteId(model.websiteId)
                .then(
                    function(response) {
                        model.pages = response.data;
                    }
                );
        }

        function updatePage() {
            if (!model.page.name) { model.message = '* Page name cannot be blank'; return; }
            pageService.updatePage(model.pageId, model.page)
                .then(
                    function(response) {

                        $location.url('/assignment/website/' + model.websiteId + '/page');
                    }
                );
        }

        function deletePage() {
            pageService.deletePage(model.pageId)
                .then(
                    function (response) {
                        $location.url('/assignment/website/' + model.websiteId + '/page');
                    }
                );
        }
    }

})();
