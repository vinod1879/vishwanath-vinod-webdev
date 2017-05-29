(function () {

    angular
        .module('WebAppMaker')
        .controller('WidgetEditController', widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {

        var model = this;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        init();

        function init() {
            model.widget = angular.copy(widgetService.findWidgetById(model.widgetId));
        }

        function updateWidget() {
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }
    }

})();
