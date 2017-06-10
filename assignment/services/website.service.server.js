var websiteModel = require('../model/website/website.model.server');

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

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(
            function (website) {
                res.json(website);
            }
        );
}

function findAllWebsitesofUser (req, res) {

    var userId = req.params['userId'];

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(
            function (websites) {
                res.json(websites);
            }
        );
}

function findWebsiteById(req, res) {

    var websiteId = req.params['websiteId'];

    websiteModel
        .findWebsiteById(websiteId)
        .then(
            function (website) {
                res.json(website);
            }
        );
}

function updateWebsite(req, res) {

    var website = req.body;
    var websiteId = req.params['websiteId'];
    
    websiteModel
        .updateWebsite(websiteId, website)
        .then(
            function (status) {
                res.sendStatus(200);
            }
        );
}

function deleteWebsite(req, res) {

    var websiteId = req.params['websiteId'];

    websiteModel
        .deleteWebsite(websiteId)
        .then(
            function (status) {
                res.sendStatus(200);
            }
        );
}
