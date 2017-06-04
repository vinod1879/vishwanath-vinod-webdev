(function () {

    angular
        .module('WebAppMaker')
        .service('userService', userService);

    function userService($http) {

        // API's provided
        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByUsername = findUserByUsername;
        this.findUserByCredentials = findUserByCredentials;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;


        // Helper Functions
        function createUser(user) {
            var url = '/api/user';

            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username=' + username;

            return $http.get(url);
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;

            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' + password;

            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;

            return $http.post(url, user);
        }

        function deleteUser(userId) {
            var url = '/api/user' + userId;

            return $http.delete(url);
        }
    }

})();
