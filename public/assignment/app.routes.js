(function () {
    angular
        .module('WebAppMaker', ['ngRoute'])
        .config(routeConfig)
        .config(locationConfig);
    
    function routeConfig($routeProvider) {

        $routeProvider
            .when('/assignment/', loginPage())
            .when('/assignment/login', loginPage())
            .when('/assignment/register', registrationPage())
            .when('/assignment/user/:uid', profilePage())
            .when('/assignment/user/:uid/website', websiteList())
            .when('/assignment/user/:uid/website/new', websiteNew())
            .when('/assignment/user/:uid/website/:wid', websiteEdit())
            .when('/assignment/user/:uid/website/:wid/page', pageList())
            .when('/assignment/user/:uid/website/:wid/page/new', pageNew())
            .when('/assignment/user/:uid/website/:wid/page/:pid', pageEdit())
            .when('/assignment/user/:uid/website/:wid/page/:pid/widget', widgetList())
            .when('/assignment/user/:uid/website/:wid/page/:pid/widget/new', widgetNew())
            .when('/assignment/user/:uid/website/:wid/page/:pid/widget/:wgid', widgetEdit())
            .otherwise(loginPage());

        console.log('Routes Configured!');
    }

    function locationConfig($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    /**
     *  Helper Methods to create routes
     */

    function loginPage() {
        return makeRoute('assignment/views/user/templates/login.view.client.html', 'loginController', 'model');
    }

    function registrationPage() {
        return makeRoute('assignment/views/user/templates/register.view.client.html', 'registerController', 'model');
    }

    function profilePage() {
        return makeRoute('assignment/views/user/templates/profile.view.client.html', 'profileController', 'model');
    }

    function websiteList() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function websiteNew() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function websiteEdit() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function pageList() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function pageNew() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function pageEdit() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function widgetList() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function widgetNew() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function widgetEdit() {
        return makeRoute('assignment/views/user/templates/profile.html');
    }

    function makeRoute(path, controller, alias) {

        return {
            templateUrl: path,
            controller: controller,
            controllerAs: alias
        }
    }

})();