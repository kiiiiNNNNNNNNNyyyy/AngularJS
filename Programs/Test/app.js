var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
	$scope.name = "Arjun";
	$scope.locations = [];
	$http
	.get("https://api.myjson.com/bins/8po8l")
	.then(function(response){
		$scope.data = response.data;
		$scope.rent = "Rent";
		$scope.sale = "Sale";
		$scope.locations = [];

		for(var i=0; i<$scope.data.length; i++){
			var obj = {};
			var address = $scope.data[i].Property.Address.StreetNumber + " " + $scope.data[i].Property.Address.StreetName + ", "
			+ $scope.data[i].Property.Address.City;
			obj.address = address;
			obj.city = $scope.data[i].Property.Address.City;
			obj.desc = "For " + $scope.data[i].Listing.Transaction;
			$scope.locations.push(obj);
		}

		var map;
		var elevator;
		var myOptions = {
			zoom: 4,
			center: new google.maps.LatLng(40.0000, -98.0000),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		};
		map = new google.maps.Map($('#map_canvas')[0], myOptions);
		console.log($scope.locations);
		for (var x = 0; x < $scope.locations.length; x++) {

			console.log($scope.locations[x].desc);
			var content = "<div><p>Go to <a href='www.corcoran.com'>www.corcoran.com</a> to get more such properties.</p></div>";

			var infowindow = new google.maps.InfoWindow({
          		content: content
        	});

			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+$scope.locations[x].address+'&sensor=false', null, function (data) {
				var p = data.results[0].geometry.location
				var latlng = new google.maps.LatLng(p.lat, p.lng);
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					title: "Houses"
				});

				marker.addListener('click', function() {
          			infowindow.open(map, marker);
          			map.setZoom(15);
          			map.setCenter(marker.getPosition())
        		});

			});
		}
	});

	$scope.price = function(x){
		var format = Number(x).toLocaleString('en');
		return format;
	}

	$scope.month = function(x){
		x = x.replace(new RegExp('/', 'g'), '-');
		// console.log(x);
		return new Date( x.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
	}

	$scope.timeChange = function(time) {

		if(time.length === 4){
			time = "0" + time;
		}
		time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			time = time.slice (1);
			time[5] = +time[0] < 12 ? ' AM' : ' PM';
			time[0] = +time[0] % 12 || 12; 
		}
		return time.join('');

	}
	//console.log($scope.timeChange("8:00"));

}]);
