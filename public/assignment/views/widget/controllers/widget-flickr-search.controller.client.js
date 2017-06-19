(function () {

    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', flickrSearchController);
    
    function flickrSearchController($location, $routeParams, FlickrService, widgetService) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        init();

        function init() {
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.widgetId = $routeParams['wgid'];

            widgetService.findWidgetById(model.widgetId)
                .then(
                    function (response) {
                        model.widget = response.data;
                    }
                );
        }

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos.photo;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            model.widget.url = url;
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(
                    function () {
                        $location.url('/assignment/website/' + model.websiteId
                            + '/page/' + model.pageId + '/widget/' + model.widgetId);
                    }
                );
        }
    }
})();
