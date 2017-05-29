(function () {

    angular
        .module('WebAppMaker')
        .controller('WidgetNewController', widgetNewController);

    function widgetNewController($routeParams, $location, widgetService) {

        var model = this;
        model.createWidget = createWidget;

        init();

        function init() {

            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];

            model.widgetTypes = widgetService.getWidgetTypes();
        }

        function createWidget(widgetType) {
            widget = {};
            widget.widgetType = widgetType;
            widget = widgetService.createWidget(model.pageId, widget);
            $location.url('/assignment/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
        }
    }

})();
