var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$timeout', '$filter', function($scope, timeout, $filter){
	$scope.name = "Arjun";	//whatever in the scope becomes available to the controller, hence to the view
	timeout(function(){
		$scope.name = 'Everyone';
	}, 3000);

	$scope.handle = '';
	$scope.characters = 5;

	$scope.rules = [
		{ rulename: "Must be 5 Characters "},
		{ rulename: "Must not be used elsewhere"},
		{ rulename: "Must be cool"}
	];

	// var rulesRequest = new XMLHttprequest();
	// rulesRequest.onreadystatechange = function(){
	// 	if(rulesRequest.readyState == 4 && rulesRequest.status == 200){
	// 		$scope.rules = JSON.parse(rulesRequest.responseText);
	// 	}
	// }

	// rulesRequest.open("GET", "");

	$scope.alertClick = function(){
		alert('Clicked!!');
	}

	$scope.lower = function(){
		return $filter('lowercase')($scope.handle);
	};

	$scope.$watch('handle', function(newValue, oldValue){
		console.info('Changed!!');
		console.log('Old: ' + oldValue);
		console.log('New: ' + newValue); 
	});

	setTimeout(function(){	//I can also use timeout dependency without binding as it is provided by angular and does the same thing.
		$scope.$apply(function(){	//used this just to show how to use js functions inside angular and how to bind them
			$scope.handle = 'newTwitterHandle';
			console.log("Scope Changed!!");
		});
	}, 3000)
}]);