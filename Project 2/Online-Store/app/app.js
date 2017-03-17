'use strict';

// Declare app level module which depends on views, and components
'use strict';
angular.module('onlineStore', [
  'ngRoute',
  'onlineStore.view1',
  'onlineStore.view2',
  'onlineStore.templates'
]).
config(['$routeProvider', function($routeProvider) {	
  $routeProvider.otherwise({redirectTo: '/templates'});
}]);
