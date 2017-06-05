(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);

    function websiteService($http) {

        // API's provided
        this.createWebsite = createWebsite;
        this.deleteWebsite = deleteWebsite;
        this.findWebsiteById = findWebsiteById;
        this.findWebsitesByUser = findAllWebsitesByUser;
        this.updateWebsite = updateWebsite;

        // Helper Functions
        function createWebsite(userId, website) {
            var url = '/api/user/' + userId + '/website';

            return $http.post(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = '/api/website/' + websiteId;

            return $http.delete(url);
        }

        function findWebsiteById(websiteId) {
            var url = '/api/website/' + websiteId;

            return $http.get(url);
        }

        function findAllWebsitesByUser(userId) {
            var url = '/api/user/' + userId + '/website';

            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {

            var url = '/api/website/' + websiteId;

            return $http.put(url, website);
        }
    }

})();
