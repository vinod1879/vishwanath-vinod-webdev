(function(){

    angular
        .module('app.routes', ['ngRoute'])
        .config(routeConfig);

    function routeConfig($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', homeRoute())
            .when('/assignment', assignmentRoute())
            .when('/project', projectRoute())
            .when('/test', testRoute());

        $locationProvider.html5Mode(true);
        console.log('Routes Configured!');
    }

    /**
     *  Helper Methods to create routes
     */

    function homeRoute() {
        return makeRoute('/home/index.html');
    }
    
    function assignmentRoute() {
        return makeRoute('/assignment/index.html');
    }

    function projectRoute() {
        return makeRoute('project/index.html');
    }

    function testRoute() {
        return makeRoute('test/index.html', 'TestController', 'model');
    }

    function makeRoute(path, controller, alias) {

        return {
            templateUrl: path,
            controller: controller,
            controllerAs: alias
        }
    }

})();
