var pageModel = require('../model/page/page.model.server');

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

    pageModel
        .createPage(websiteId, page)
        .then(
            function (page) {
                res.json(page);
            },
            function (error) {
                res.status(401).json(error);
            }
        );
}

function findAllPagesOfWebsite(req, res) {

    var websiteId = req.params['websiteId'];

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(
            function (pages) {
                res.json(pages);
            },
            function (error) {
                res.status(401).json(error);
            }
        );
}

function findPageById (req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(
            function (page) {
                res.json(page);
            },
            function (error) {
                res.status(400).json(error);
            }
        );
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];

    pageModel
        .updatePage(pageId, page)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(400).json(error);
            }
        );
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .deletePage(pageId)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(400).json(error);
            }
        );
}
