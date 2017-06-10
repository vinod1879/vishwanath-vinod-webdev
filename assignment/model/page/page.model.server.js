var mongoose = require('mongoose'),
    pageSchema = require('./page.schema.server'),
    pageModel = mongoose.model('PageModel', pageSchema),
    websiteModel = require('../website/website.model.server');


pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

/**
 * Exports
 */
module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;

    return pageModel
        .create(page)
        .then(function (page) {

            return websiteModel
                .addPage(websiteId, page._id);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}
