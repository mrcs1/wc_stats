var gallery = angular.module('gallery', ['ngRoute']);

gallery.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	/** Routes for gallery iamges **/
	when("/:id", {templateUrl: "image.html", controller: "galleryController"}).
	when("/", {templateUrl: "image.html", controller: "galleryController"})
	;
}]);

gallery.config(function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist(['self','http://static.rasset.ie/**', 'http://*.rte.ie/**']);
});

gallery.factory('solrService', function($http) {
	var solr = {};
    solr.getGallery = function() {return $http.jsonp("http://feeds.rasset.ie/sitesearch/newsnowlive/select/?q=id:" + bosco.getQueryStringFromUrl(queryString, "id") + "&wt=json&json.wrf=JSON_CALLBACK")};
    return solr;

});

gallery.run(function($rootScope, solrService, $routeParams) {
    solrService.getGallery().success(function (response) {
		$rootScope.data = response;
		$rootScope.title = $rootScope.data.response.docs[0].title;
		$rootScope.excerpt = $rootScope.data.response.docs[0].excerpt;
		$rootScope.images = jQuery.parseJSON( $rootScope.data.response.docs[0].images );
	});

});

/* Controller for displaying the gallery */
gallery.controller('galleryController', function($scope, $rootScope, $routeParams, solrService, $sce) {
	$scope.id = $routeParams.id;
	$scope.$watch(function(){return $rootScope.images},function(){				
		if ($scope.id == null){$scope.id = 0;}; // Set id to 0 if on the first page
		$scope.prev = parseInt($scope.id) - 1;
		$scope.next = parseInt($scope.id) + 1;
		if ($rootScope.images) {
			$scope.limit = $rootScope.images.length;
			$scope.caption = $rootScope.images[$scope.id].caption;
			var imageUrl = '//img.rasset.ie/' + $rootScope.images[$scope.id].id + "-" + bosco.getQueryStringFromUrl(queryString, "image-width", 350) + ".jpg";
			$scope.imageUrl = $sce.trustAsResourceUrl(imageUrl);
			// Preload next image
			if (parseInt($scope.id) < $scope.limit - 1 ) {
				var img = new Image();
				img.src = '//img.rasset.ie/' + $rootScope.images[parseInt($scope.id)+1].id + "-" + bosco.getQueryStringFromUrl(queryString, "image-width", 350) + ".jpg";
			};
		};
		
	})
});