(function () {
    angular
        .module('app.routes', ['ngRoute'])
        .config(config)
        .config(locationConfig);
    
    function config($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', homeRoute())
            .when('/assignment-home', assignmentRoute())
            .when('/project-home', projectRoute())
            .when('/test-home', testRoute());

        console.log('Routes Configured!');
    }

    function locationConfig($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    /**
     *  Helper Methods to create routes
     */

    function homeRoute() {
        return makeRoute('home/home.html');
    }

    function assignmentRoute() {
        return makeRoute('home/assignment.html');
    }

    function projectRoute() {
        return makeRoute('home/project.html');
    }

    function testRoute() {
        return makeRoute('home/test.html');
    }

    function makeRoute(path, controller, alias) {

        return {
            templateUrl: path,
            controller: controller,
            controllerAs: alias
        }
    }

})();