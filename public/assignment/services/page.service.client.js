(function () {

    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService ($http) {

        // API's provided
        this.createPage = createPage;
        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        // Helper Functions
        function createPage(websiteId, page) {
            var url = '/api/website/' + websiteId + '/page';

            return $http.post(url, page);
        }

        function findPagesByWebsiteId(websiteId) {
            var url = '/api/website/' + websiteId + '/page';

            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = '/api/page/' + pageId;

            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = '/api/page/' + pageId;

            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = '/api/page/' + pageId;

            return $htp.delete(url);
        }
    }

})();