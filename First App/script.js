// Code goes here
var app = angular.module("computer", ['ngRoute']);
var config = app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/main', {
		templateUrl: 'main.html',
		controller: 'MainController'
	}).when('/about', {
	    templateUrl: 'about.html',
	    controller: 'aboutController'
	}).when('/services', {
	    templateUrl: 'services.html',
	    controller: 'servicesController'
	}).when('/contact', {
	    templateUrl: 'contact.html',
	    controller: 'contactController'
	}).otherwise({redirectTo: '/main'})
}]);

var controller = config.controller('MainController',[ '$scope', function($scope){
    $scope.person = "Arjun";
	console.log($scope);
}]);

controller = config.controller('aboutController',[ '$scope', function($scope){
    $scope.person = "Arjun";
	console.log($scope);
}]);

controller = config.controller('servicesController',[ '$scope', '$http', function($scope, $http){
    $http.get('services.json').then(function(response){
        $scope.services = response.data;
    });
}]);

controller = config.controller('contactController',[ '$scope', '$http', function($scope, $http){
    $http.get('location.json').then(function(response){
        $scope.locations = response.data;
    });
}]);
