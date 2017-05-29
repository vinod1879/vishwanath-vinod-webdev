(function () {

    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);

    function widgetService() {

        // API's provied
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.getWidgetTypes = getWidgetTypes;

        // Helper Functions
        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;

            widgets.push(widget);

            return widget;
        }

        function findWidgetsByPageId(pageId) {

            return widgets.filter(function(widget) {
                return widget.pageId === pageId;
            })
        }

        function findWidgetById(widgetId) {

            return widgets.find(function(widget) {
                return widget._id === widgetId;
            })
        }
        
        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);

            widgets[index] = widget;
        }

        function deleteWidget(widgetId) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);

            widgets.splice(index, 1);
        }

        function getWidgetTypes() {

            return widgetTypes;
        }
    }

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var widgetTypes = [
        { "widgetType": "HEADING", "text": "Heading" },
        { "widgetType": "HTML", "text": "Label" },
        { "widgetType": "HTML", "text": "HTML" },
        { "widgetType": "HTML", "text": "Text Input" },
        { "widgetType": "HTML", "text": "Link" },
        { "widgetType": "HTML", "text": "Button" },
        { "widgetType": "IMAGE", "text": "Image" },
        { "widgetType": "YOUTUBE", "text": "YouTube" },
        { "widgetType": "HTML", "text": "Table" },
        { "widgetType": "HTML", "text": "Repeater" }
    ];

})();