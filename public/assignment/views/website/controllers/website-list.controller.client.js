(function () {

    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', websiteListController);

    function websiteListController(websiteService, currentUser) {

        var model = this;
        model.getDateString = getDateString;

        init();

        function init() {
            model.userId = currentUser._id;
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
