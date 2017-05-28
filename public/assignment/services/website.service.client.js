(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);

    function websiteService() {

        this.createWebsite = createWebsite;
        this.deleteWebsite = deleteWebsite;
        this.findWebsiteById = findWebsiteById;
        this.findWebsitesForUser = findAllWebsitesofUser;

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
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

        function findAllWebsitesofUser(userId) {
            var results = [];

            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    websites[i].accessed = new Date();
                    results.push(websites[i]);
                }
            }

            return results;
        }
    }

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

})();