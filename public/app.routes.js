(function(){

    angular
        .module('app.routes', ['ngRoute'])
        .config(routeConfig);

    function routeConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', homeRoute())
            .when('/assignment-home', assignmentRoute())
            .when('/project-home', projectRoute())
            .when('/test-home', testRoute());

        $locationProvider.html5Mode(true);
        console.log('Routes Configured!');
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
