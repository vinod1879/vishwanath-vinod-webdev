(function () {

    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);

    function widgetService($http) {

        // API's provied
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.getWidgetTypes = getWidgetTypes;
        this.reorderWidgets = reorderWidgets;

        // Helper Functions
        function createWidget(pageId, widget) {
            var url = '/api/page/' + pageId + '/widget';

            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = '/api/page/' + pageId + '/widget';

            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = '/api/widget/' + widgetId;

            return $http.get(url);
        }
        
        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' + widgetId;

            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = '/api/widget/' + widgetId;

            return $http.delete(url);
        }

        function getWidgetTypes() {
            var url = '/api/widgetTypes';

            return $http.get(url);
        }

        function reorderWidgets(pageId, startIndex, endIndex) {
            var url = '/api/page/' + pageId + '/widget?initial=' + startIndex + "&final=" + endIndex;

            return $http.put(url);
        }
    }

})();