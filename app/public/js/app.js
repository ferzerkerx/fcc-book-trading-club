'use strict';


var tradingApp = angular.module('tradingApp', [
    'ngRoute',
    'tradingControllers',
    'tradingServices'
]);

tradingApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'public/partials/home.html',
            controller: 'homeController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }]);
