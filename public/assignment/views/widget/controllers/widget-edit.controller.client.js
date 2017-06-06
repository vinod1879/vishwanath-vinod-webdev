(function () {

    angular
        .module('WebAppMaker')
        .controller('WidgetEditController', widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {

        var model = this;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.widgetId = $routeParams['wgid'];

            widgetService.findWidgetById(model.widgetId)
                .then(
                    function (response) {
                        model.widget = response.data;
                    }
                );
        }

        function updateWidget() {
            widgetService.updateWidget(model.widgetId, model.widget)
                .then(
                    function (response) {
                        $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page/'
                            + model.pageId + '/widget');
                    }
                );
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId)
                .then(
                    function (response) {
                        $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page/'
                            + model.pageId + '/widget');
                    }
                );
        }
    }

})();
