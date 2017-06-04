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
			obj.desc = "This property is for " + $scope.data[i].Listing.Transaction;
			if($scope.data[i].Listing.Transaction === "Rent"){
				obj.price = "$" + $scope.price($scope.data[i].Listing.Price) + "/month";
			}else if($scope.data[i].Listing.Transaction === "Sale"){
				obj.price = "$" + $scope.price($scope.data[i].Listing.Price);
			}
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

		var setMarker = function(latlng, content, hovercontent, address){
			
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: address
			});

			var infowindow = new google.maps.InfoWindow({
				content: content
			});

			var hoverinfowindow = new google.maps.InfoWindow({
				content: hovercontent
			});

			marker.addListener('click', function() {
				hoverinfowindow.close()
				infowindow.open(map, marker);
				map.setZoom(15);
				map.setCenter(marker.getPosition())
			});

			marker.addListener('mouseover', function() {
				setTimeout(function() { hoverinfowindow.open(map, marker) }, 500);
			});

			marker.addListener('mouseout', function() {
    			infowindow.close();
    			hoverinfowindow.close();
			});
		}

		for (var x = 0; x < $scope.locations.length; x++) {
			console.log($scope.locations);
			var address = $scope.locations[x].address;
			var content = "<div><h4>" + $scope.locations[x].address + " <h4><p>" + $scope.locations[x].desc + " @ " + $scope.locations[x].price +"</p></div>";
			var content2 = "<h3>" + $scope.locations[x].address + "</h3><p>Click the marker for more information!!</p>"
			var infowindow = new google.maps.InfoWindow({
				content: content
			});

			var hoverinfowindow = new google.maps.InfoWindow({
				content: content2
			});
			var xyz = null;
			$.ajax({ url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+$scope.locations[x].address+'&sensor=false', 
				async: false,
				dataType: 'json',
				success: function(data) {
					xyz = data;
				}
			});
			console.log(xyz);

			var p = xyz.results[0].geometry.location
			var latlng = new google.maps.LatLng(p.lat, p.lng);
			setMarker(latlng, content, content2, );
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
