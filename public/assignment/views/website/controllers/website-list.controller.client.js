(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.getDateString = getDateString;

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

        function getDateString(date) {
            if (date) {
                date = new Date(date);
                return dateFormat(date, 'mmm d yyyy');
            }
        }
    }

})();
