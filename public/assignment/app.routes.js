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
            .when('/assignment/user/:uid/website/:wid/page/:pid/widget/:wgid/image-search', widgetImageSearch())
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
        return makeRoute('assignment/views/website/templates/website-list.view.client.html', 'WebsiteListController', 'model');
    }

    function websiteNew() {
        return makeRoute('assignment/views/website/templates/website-new.view.client.html', 'WebsiteNewController', 'model');
    }

    function websiteEdit() {
        return makeRoute('assignment/views/website/templates/website-edit.view.client.html', 'WebsiteEditController', 'model');
    }

    function pageList() {
        return makeRoute('assignment/views/page/templates/page-list.view.client.html', 'PageListController', 'model');
    }

    function pageNew() {
        return makeRoute('assignment/views/page/templates/page-new.view.client.html', 'PageNewController', 'model');
    }

    function pageEdit() {
        return makeRoute('assignment/views/page/templates/page-edit.view.client.html', 'PageEditController', 'model');
    }

    function widgetList() {
        return makeRoute('assignment/views/widget/templates/widget-list.view.client.html', 'WidgetListController', 'model');
    }

    function widgetNew() {
        return makeRoute('assignment/views/widget/templates/widget-chooser.view.client.html', 'WidgetNewController', 'model');
    }

    function widgetEdit() {
        return makeRoute('assignment/views/widget/templates/widget-edit.view.client.html', 'WidgetEditController', 'model');
    }

    function widgetImageSearch () {
        return makeRoute('assignment/views/widget/templates/widget-flickr-search.view.client.html', 'FlickrImageSearchController', 'model');
    }

    function makeRoute(path, controller, alias) {

        return {
            templateUrl: path,
            controller: controller,
            controllerAs: alias
        }
    }

})();