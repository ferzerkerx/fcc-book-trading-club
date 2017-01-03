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
        })
        .when('/my-books', {
            templateUrl: 'public/partials/my-books.html',
            controller: 'myBooksController'
        })
        .when('/all-books', {
            templateUrl: 'public/partials/all-books.html',
            controller: 'allBooksController'
        })
        .when('/settings', {
            templateUrl: 'public/partials/settings.html',
            controller: 'settingsController'
        })
        .when('/signUp', {
            templateUrl: 'public/partials/signUp.html',
            controller: 'signUpController'
        })
        .when('/login', {
            templateUrl: 'public/partials/login.html',
            controller: 'loginController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }]);
