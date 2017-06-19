(function () {

    angular
        .module('WebAppMaker')
        .controller('WidgetNewController', widgetNewController);

    function widgetNewController($routeParams, $location, widgetService) {

        var model = this;
        model.createWidget = createWidget;

        init();

        function init() {

            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];

            fetchWidgetTypes();
        }

        function fetchWidgetTypes () {
            widgetService.getWidgetTypes()
                .then(
                    function (response) {
                        model.widgetTypes = response.data;
                    }
                );
        }

        function createWidget(widgetType) {

            console.log('Creating widget...');
            widgetService.createWidget(model.pageId, {type: widgetType})
                .then(
                    function (response) {
                        console.log('Creating widget...complete');
                        var widget = response.data;
                        $location.url('/assignment/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                    }
                );
        }
    }

})();
