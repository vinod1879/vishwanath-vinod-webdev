var mongoose = require('mongoose'),
    websiteSchema = require('./website.schema.server'),
    websiteModel = mongoose.model('WebsiteModel', websiteSchema),
    userModel = require('../user/user.model.server');


websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;

/**
 * Exports
 */
module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    website._user = userId;

    return websiteModel
        .create(website)
        .then(function (website) {

            return userModel
                .addWebsite(userId, website._id);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}

function addPage(websiteId, pageId) {
    return websiteModel.findOne({_id: websiteId})
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        })
}
