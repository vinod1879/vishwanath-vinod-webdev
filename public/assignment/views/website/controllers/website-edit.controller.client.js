(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService, currentUser) {

        var model = this;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        init();

        function init() {
            model.userId = currentUser._id;
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
            if (!model.website.name) { model.message = '* Website name cannot be blank'; return; }
            websiteService.updateWebsite(model.websiteId, model.website)
                .then(
                    function (response) {
                        $location.url('/assignment/website');
                    }
                );
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId)
                .then(
                    function (response) {
                        $location.url('/assignment/website');
                    }
                );
        }
    }

})();
