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

function widgetService(app) {

    app.post  ('/api/page/:pageId/widget', createWidget);
    app.get   ('/api/page/:pageId/widget', findAllWidgetsOfPage);
    app.get   ('/api/widget/:widgetId', findWidgetById);
    app.put   ('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
}
/**
 * User API routing
 */
module.exports = widgetService;

/**
 * User API route handlers
 */

function createWidget (req, res) {

    var pageId = req.params['pageId'];
    var widget = req.body;

    widget._id = (new Date()).getTime() + "";
    widget.widgetId = pageId;
    widget.createdOn = getDateString(new Date());
    widget.updatedOn = getDateString(new Date());

    widgets.push(widget);

    sendWidgetResponse(widget, res);
}

function findAllWidgetsOfPage(req, res) {

    var pageId = req.params['pageId'];
    var matches = widgets.filter(function(wg) {

        return wg.pageId === pageId;
    });

    res.json(matches);
}

function findWidgetById (req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function(wg) {
        return wg._id === widgetId;
    });

    sendWidgetResponse(widget, res);
}

function updateWidget(req, res) {
    var widget = req.body;
    var index = findIndexOfWidgetId(req.params['widgetId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        widgets[index] = widgets;
        res.sendStatus(200);
    }
}

function deleteWidget(req, res) {
    var index = findIndexOfWidgetId(req.params['widgetId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        widgets.splice(index, 1);
        res.sendStatus(200);
    }
}

// Helper Functions

function sendWidgetResponse(widget, res) {
    if (widget) {
        res.json(widget);
    }
    else {
        res.status(404).json({message: "No such widget exists!"});
    }
}

function findIndexOfWidgetId(widgetId) {

    for(var i in widgets) {
        if (widgets[i]._id === widgetId) {
            return i;
        }
    }

    return -1;
}

function getDateString(date) {
    return "" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}
