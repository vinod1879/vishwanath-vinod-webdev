var widgets = [
    { "_id": "123", "index": 0, "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "index": 1, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "index": 2, "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "index": 3, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "index": 4, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "index": 5, "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "index": 6, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
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

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post  ('/api/page/:pageId/widget', createWidget);
    app.get   ('/api/page/:pageId/widget', findAllWidgetsOfPage);
    app.put   ('/api/page/:pageId/widget', updateWidgetOrder);
    app.get   ('/api/widget/:widgetId', findWidgetById);
    app.put   ('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.get   ('/api/widgetTypes', findAllWidgetTypes);
    app.post  ("/api/upload", upload.single('myFile'), uploadImage);
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
    widget.pageId = pageId;
    widget.createdOn = getDateString(new Date());
    widget.updatedOn = getDateString(new Date());

    widgets.push(widget);

    sendWidgetResponse(widget, res);
}

function findAllWidgetsOfPage(req, res) {

    var pageId = req.params['pageId'];

    var matches = fetchWidgetsOfPage(pageId);

    res.json(matches);
}

function findWidgetById (req, res) {
    var widgetId = req.params['widgetId'];

    sendWidgetResponse(getWidgetById(widgetId), res);
}

function updateWidget(req, res) {
    var widget = req.body;
    var index = findIndexOfWidgetId(req.params['widgetId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        widgets[index] = widget;
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

function updateWidgetOrder(req, res) {

    if (req.query['initial'] && req.query['final']) {

        var initial = parseInt(req.query['initial']);
        var final = parseInt(req.query['final']);
        var pageId = req.params['pageId'];

        var matches = fetchWidgetsOfPage(pageId);

        if (initial >= 0 && final < matches.length && initial !== final) {

            var start, end, delta;

            if (initial < final) {
                start = initial;
                end = final;
                delta = -1;
            }
            else {
                start = final;
                end = initial;
                delta = 1;
            }

            for (var i=start; i <= end; i++) {

                if (i === initial) {
                    matches[i].index = final;
                }
                else {
                    matches[i].index += delta;
                }
            }

            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(400);
}

function findAllWidgetTypes(req, res) {
    return res.json(widgetTypes);
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/'+filename;

    var callbackUrl   = "/assignment/user/"+userId+"/website/"+websiteId+'/page/'+pageId+'/widget/'+widgetId;

    res.redirect(callbackUrl);
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

function fetchWidgetsOfPage(pageId) {
    var matches = widgets.filter(function(wg) {

        return wg.pageId === pageId;
    });
    return matches.sort(function(o1, o2) {
        return o1.index > o2.index;
    });
}

function getWidgetById(widgetId) {

    return widget = widgets.find(function(wg) {
        return wg._id === widgetId;
    });
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
