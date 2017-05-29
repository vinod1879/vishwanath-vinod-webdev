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
            page.createdOn = getDateString(new Date());
            page.updatedOn = getDateString(new Date());

            pages.push(page);
        }

        function getDateString(date) {
            return "" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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

            page.updatedOn = getDateString(new Date());

            pages[index] = page;
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);

            pages.splice(index, 1);
        }
    }

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem", "createdOn": "1/1/2012", "updatedOn": "1/1/2017"  },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem", "createdOn": "1/1/2012", "updatedOn": "1/1/2017"  },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem", "createdOn": "1/1/2012", "updatedOn": "1/1/2017"  }
    ];

})();