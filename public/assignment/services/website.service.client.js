(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);

    function websiteService() {

        this.createWebsite = createWebsite;
        this.deleteWebsite = deleteWebsite;
        this.findWebsiteById = findWebsiteById;
        this.findWebsitesByUser = findAllWebsitesByUser;
        this.updateWebsite = updateWebsite;

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website)
        }

        function deleteWebsite(websiteId) {
            var website = findWebsiteById(websiteId);
            var index = website.indexOf(website);
            websites.splice(index, 1);
        }

        function findWebsiteById(websiteId) {
            return websites.find(function(website) {
                return website._id === websiteId;
            });
        }

        function findAllWebsitesByUser(userId) {
            var results = [];

            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    websites[i].accessed = new Date();
                    results.push(websites[i]);
                }
            }

            return results;
        }

        function updateWebsite(websiteId, website) {

            var previous = findWebsiteById(websiteId);
            var index = website.indexOf(previous);

            websites[index] = website;
        }
    }

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "createdOn": "1/1/2004", "modifiedOn": "1/1/2017" },
        { "_id": "234", "name": "Twitter",     "developerId": "456", "description": "Lorem", "createdOn": "1/1/2011", "modifiedOn": "1/1/2017" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "createdOn": "1/1/2006", "modifiedOn": "1/1/2017" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem", "createdOn": "1/1/2016", "modifiedOn": "1/1/2017" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "createdOn": "1/1/2004", "modifiedOn": "1/1/2017" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "createdOn": "1/1/2009", "modifiedOn": "1/1/2017" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "createdOn": "1/1/2012", "modifiedOn": "1/1/2017" }
    ];

})();
