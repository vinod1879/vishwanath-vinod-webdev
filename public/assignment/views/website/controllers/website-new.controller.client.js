(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', websiteNewController);

    function websiteNewController($location, websiteService, currentUser) {

        var model = this;
        model.createWebsite = createWebsite;

        init();

        function init() {

            model.userId = currentUser._id;
            model.website = {};
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

        function createWebsite() {
            websiteService.createWebsite(model.userId, model.website)
                .then(function (response) {
                    $location.url('/assignment/website');
                });
        }
    }

})();
