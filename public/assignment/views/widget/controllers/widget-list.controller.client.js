(function () {

    angular
        .module('WebAppMaker')
        .controller('WidgetListController', widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {

        var model = this;

        model.widgetUrl = widgetUrl;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.trust = trust;


        function init() {

            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];

            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();
        
        function widgetUrl(widget) {

            return 'assignment/views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }

})();
