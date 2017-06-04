var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "createdOn": "1/1/2004", "updatedOn": "1/1/2017" },
    { "_id": "234", "name": "Twitter",     "developerId": "456", "description": "Lorem", "createdOn": "1/1/2011", "updatedOn": "1/1/2017" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "createdOn": "1/1/2006", "updatedOn": "1/1/2017" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem", "createdOn": "1/1/2016", "updatedOn": "1/1/2017" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "createdOn": "1/1/2004", "updatedOn": "1/1/2017" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "createdOn": "1/1/2009", "updatedOn": "1/1/2017" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "createdOn": "1/1/2012", "updatedOn": "1/1/2017" }
];

function websiteService(app) {

    app.post  ('/api/user/:userId/website', createWebsite);
    app.get   ('/api/user/:userId/website', findAllWebsitesofUser);
    app.get   ('/api/website/:websiteId', findWebsiteById);
    app.put   ('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);
}
/**
 * User API routing
 */
module.exports = websiteService;

/**
 * User API route handlers
 */
function createWebsite(req, res) {

    var userId = req.params['userId'];
    var website = req.body;

    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    website.createdOn = getDateString(new Date());
    website.updatedOn = getDateString(new Date());
    websites.push(website);

    sendWebsiteResponse(website, res);
}

function findAllWebsitesofUser (req, res) {

    var userId = req.params['userId'];
    var matches = websites.filter(function(wb) {

        return wb.developerId === userId;
    });

    res.json(matches);
}

function findWebsiteById(req, res) {

    var websiteId = req.params['websiteId'];
    var website = websites.find(function(wb) {
        return wb._id === websiteId;
    });

    sendWebsiteResponse(website, res);
}

function updateWebsite(req, res) {

    var website = req.body;
    var index = findIndexOfWebsiteId(req.params['websiteId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        websites[index] = website;
        res.sendStatus(200);
    }
}

function deleteWebsite(req, res) {

    var index = findIndexOfWebsiteId(req.params['websiteId']);

    if (index === -1) {
        res.sendStatus(400);
    }
    else {
        websites.splice(index, 1);
        res.sendStatus(200);
    }
}

// Helper Functions

function sendWebsiteResponse(website, res) {
    if (website) {
        res.json(website);
    }
    else {
        res.status(404).json({message: "No such website exists!"});
    }
}

function findIndexOfWebsiteId(websiteId) {

    for(var i in websites) {
        if (websites[i]._id === websiteId) {
            return i;
        }
    }

    return -1;
}

function getDateString(date) {
    return "" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}
