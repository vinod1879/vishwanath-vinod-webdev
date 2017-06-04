var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem", "createdOn": "1/1/2012", "updatedOn": "1/1/2017"  },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem", "createdOn": "1/1/2012", "updatedOn": "1/1/2017"  },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem", "createdOn": "1/1/2012", "updatedOn": "1/1/2017"  }
];

function pageService(app) {

    app.post  ('/api/website/:websiteId/page', createPage);
    app.get   ('/api/website/:websiteId/page', findAllPagesOfWebsite);
    app.get   ('/api/page/:pageId', findPageById);
    app.put   ('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
}
/**
 * User API routing
 */
module.exports = pageService;

/**
 * User API route handlers
 */

function createPage (req, res) {

    var websiteId = req.params['websiteId'];
    var page = req.body;

    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    page.createdOn = getDateString(new Date());
    page.updatedOn = getDateString(new Date());

    pages.push(page);

    sendPageResponse(page, res);
}

function findAllPagesOfWebsite(req, res) {

    var websiteId = req.params['websiteId'];
    var matches = pages.filter(function(pg) {

        return pg.websiteId === websiteId;
    });

    res.json(matches);
}

function findPageById (req, res) {
    var pageId = req.params['pageId'];
    var page = pages.find(function(pg) {
        return pg._id === pageId;
    });

    sendPageResponse(page, res);
}

function updatePage(req, res) {
    var page = req.body;
    var index = findIndexOfPageId(req.params['pageId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        pages[index] = page;
        res.sendStatus(200);
    }
}

function deletePage(req, res) {
    var index = findIndexOfPageId(req.params['pageId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        pages.splice(index, 1);
        res.sendStatus(200);
    }
}

// Helper Functions

function sendPageResponse(page, res) {
    if (page) {
        res.json(page);
    }
    else {
        res.status(404).json({message: "No such page exists!"});
    }
}

function findIndexOfPageId(pageId) {

    for(var i in pages) {
        if (pages[i]._id === pageId) {
            return i;
        }
    }

    return -1;
}

function getDateString(date) {
    return "" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}
