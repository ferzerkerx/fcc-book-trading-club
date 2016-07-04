'use strict';


var tradingControllers = angular.module('tradingControllers', []);

tradingControllers.controller('homeController', ['$scope', '$route', '$window','$location', 'tradingService',
    function ($scope, $route, $window, $location, tradingService) {


    }]);


tradingControllers.controller('allBooksController', ['$scope', '$route', '$window','$location', 'tradingService',
    function ($scope, $route, $window, $location, tradingService) {

        $scope.books = [];

        tradingService.listAllBooks().then(function(data) {
            $scope.books = data;
        });

    }]);


tradingControllers.controller('myBooksController', ['$scope', '$route', '$window','$location', 'tradingService',
    function ($scope, $route, $window, $location, tradingService) {
        $scope.form = {};
        $scope.userBooks = [];

        $scope.addUserBook = function() {
            tradingService.addUserBook($scope.form.bookName).then(function(data) {
                $scope.userBooks.push(data);
            });
        };

        $scope.removeBook = function(index) {
            var book = $scope.userBooks[index];

            tradingService.removeBook(book.book_id).then(function() {
                $scope.userBooks.splice(index, 1);
            });
        };

        tradingService.listMyBooks().then(function(data) {
            $scope.userBooks = data;
        });

    }]);


tradingControllers.controller('settingsController', ['$scope', '$rootScope','$route', '$window','$location', 'tradingService',
    function ($scope, $rootScope, $route, $window, $location, tradingService) {
        $scope.form = {
            fullName: $rootScope.userDetails.fullName,
            city: $rootScope.userDetails.city,
            state: $rootScope.userDetails.state
        };

        $scope.updateSettings = function() {
            tradingService.updateSettings($scope.form).then(function() {
                $route.reload();
            });
        };

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