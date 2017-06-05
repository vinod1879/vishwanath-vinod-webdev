(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {

        var model = this;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            fetchWebsite();
            fetchWebsites();
        }

        function fetchWebsite () {
            websiteService.findWebsiteById(model.websiteId)
                .then(
                    function (response) {
                        model.website = response.data;
                    }
                )
        }

        function fetchWebsites() {
            websiteService.findWebsitesByUser(model.userId)
                .then(
                    function (response) {
                        model.websites = response.data;
                    }
                );
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId, model.website)
                .then(
                    function (response) {
                        $location.url('/assignment/user/' + model.userId + '/website');
                    }
                );
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId)
                .then(
                    function (response) {
                        $location.url('/assignment/user/' + model.userId + '/website');
                    }
                );
        }
    }

})();
