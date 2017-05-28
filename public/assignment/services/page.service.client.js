(function () {

    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService () {

        // API's provided
        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        // Helper Functions
        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;

            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var results = []

            for (var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    results.push(pages[i]);
                }
            }

            return results;
        }

        function findPageById(pageId) {

            return pages.find(function(page) {
                return page._id === pageId;
            })
        }

        function updatePage(pageId, page) {
            var oldPage = findPageById(pageId);
            var index = pages.indexOf(oldPage);

            pages[index] = page;
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);

            pages.splice(index, 1);
        }
    }

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

})();