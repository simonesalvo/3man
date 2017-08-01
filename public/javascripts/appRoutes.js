/**
 * Created by ssalvo on 29/07/2017.
 */


angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '../../views/home.html',
            controller: 'mainCtrl'
        });

    $locationProvider.html5Mode(true);

}]);
