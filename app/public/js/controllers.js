'use strict';


var tradingControllers = angular.module('tradingControllers', []);

tradingControllers.controller('homeController', ['$scope', '$route', '$window','$location', 'tradingService',
    function ($scope, $route, $window, $location, tradingService) {


    }]);


tradingControllers.controller('allBooksController', ['$scope', '$route', '$window','$location', 'tradingService',
    function ($scope, $route, $window, $location, tradingService) {


    }]);


tradingControllers.controller('myBooksController', ['$scope', '$route', '$window','$location', 'tradingService',
    function ($scope, $route, $window, $location, tradingService) {
        $scope.form = {};
        $scope.userBooks = [];

        $scope.addBook = function() {
            tradingService.addBook($scope.form.bookName).then(function(data) {
                $scope.userBooks.push(data);
            });
        };

        tradingService.listMyBooks().then(function(data) {
            $scope.userBooks = data;
        });

    }]);

tradingControllers.controller('barController', ['$scope', '$rootScope', '$route', '$routeParams' ,'$window','$location', 'tradingService',
    function ($scope, $rootScope, $route, $routeParams , $window, $location, tradingService) {

        $rootScope.userDetails = {};

        tradingService.userDetails().then(function(data) {
            $rootScope.userDetails = data;
        });

        $scope.login = function () {
            tradingService.doLogin().then(function() {
                $route.reload();
            });
        };

    }]);