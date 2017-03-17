var app = angular.module('onlineStore.templates', ['ngRoute']);
var conf = app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/templates', {
		templateUrl: 'templates/templates.html',
		controller: 'templatesControllers'
	}).when('/templates/:templateId', {
		templateUrl: 'templates/templateDetails.html',
		controller: 'templateDetailsController'
	});
}]);

conf.controller('templatesControllers', ['$scope', '$http', function($scope, $http){
	$http.get('json/templates.json').success(function(response){
		$scope.templates = response;
	});
}]);

conf.controller('templateDetailsController', ['$scope', '$routeParams', '$filter', '$http', function($scope, $routeParams, $filter, $http){
	var templateId = $routeParams.templateId;
	$http.get('json/templates.json').then(function(data){
		$scope.temp = data.data;
		$scope.template = $filter('filter')($scope.temp, function(d){
			return d.id == templateId;
		})[0];
		$scope.MainImage = $scope.template.images[0].name;
		$scope.des = $scope.template.description;
		console.log($scope.des);
	});

	$scope.setImage = function(image){
		$scope.MainImage = image.name;
	}
}]);