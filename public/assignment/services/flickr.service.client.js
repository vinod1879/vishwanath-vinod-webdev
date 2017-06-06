(function () {

    angular
        .module("WebAppMaker")
        .service("FlickrService", flickrService);

    function flickrService ($http) {

        var key = '2d753a221b19d791f645552a97ce3c8a';
        var secret = '32c9ec4beb395b1b';

        this.searchPhotos = searchPhotos;

        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
            urlBase += "&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
