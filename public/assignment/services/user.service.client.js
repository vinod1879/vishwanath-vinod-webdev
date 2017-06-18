(function () {

    angular
        .module('WebAppMaker')
        .service('userService', userService);

    function userService($http) {

        // API's provided
        this.register = register;
        this.findUserById = findUserById;
        this.findUserByUsername = findUserByUsername;
        this.login = login;
        this.logout = logout;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;


        // Helper Functions
        function createUser(user) {
            var url = '/api/user';

            return $http.post(url, user);
        }

        function register(user) {
            return $http.post('/api/register', user);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username=' + username;

            return $http.get(url);
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;

            return $http.get(url);
        }

        function login(username, password) {
            return $http.post('/api/login', {username: username, password: password});
        }

        function logout() {
            return $http.post('/api/logout');
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;

            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = '/api/user' + userId;

            return $http.delete(url);
        }
    }

})();
