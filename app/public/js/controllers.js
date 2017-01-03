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

        $scope.proposeTrade = function(index) {
            var book = $scope.books[index];

            tradingService.proposeTrade(book._id).then(function() {
                $location.path('/my-books');
            });
        };

    }]);


tradingControllers.controller('myBooksController', ['$scope', '$route', '$window','$location', 'tradingService',
    function ($scope, $route, $window, $location, tradingService) {
        $scope.form = {};
        $scope.userBooks = [];
        $scope.userTrades = [];


        $scope.denyTrade = function(index) {
            var trade  = $scope.userTrades.trades.pendingTrades[index];
            tradingService.denyTrade(trade._id).then(function() {
                $route.reload();
            });
        };

        $scope.acceptTrade = function(index) {
            var trade  = $scope.userTrades.trades.pendingTrades[index];
            tradingService.acceptTrade(trade._id).then(function() {
                $route.reload();
            });
        };

        $scope.endTrade = function(index) {
            var trade  = $scope.userTrades.trades.acceptedTrades[index];
            tradingService.endTrade(trade._id).then(function() {
                $route.reload();
            });
        };

        $scope.addBook = function() {
            tradingService.addUserBook($scope.form.bookName).then(function(data) {
                $scope.userBooks.push(data);
                $scope.form = {};
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

        tradingService.listMyTrades().then(function(data) {
            $scope.userTrades = data;
        });

    }]);


tradingControllers.controller('settingsController', ['$scope', '$rootScope','$route', '$window','$location', 'tradingService',
    function ($scope, $rootScope, $route, $window, $location, tradingService) {

        refreshUserDetails(tradingService, $rootScope);

        $scope.updateSettings = function() {
            var userDetails = $rootScope.userDetails;
            var form = {
                fullName: userDetails.fullName,
                city: userDetails.city,
                state: userDetails.state
            };
            tradingService.updateSettings(form).then(function() {
                $location.path('/home');
            });
        };

    }]);

tradingControllers.controller('signUpController', ['$scope', '$rootScope','$route', '$window','$location', 'tradingService',
    function ($scope, $rootScope, $route, $window, $location, tradingService) {
        $scope.form = {};

        $scope.signUp = function() {
            tradingService.signUp($scope.form).then(function() {
                $scope.form = {};
                $location.path('/home');
            });
        };

    }]);

tradingControllers.controller('loginController', ['$scope', '$rootScope','$route', '$window','$location', 'tradingService',
    function ($scope, $rootScope, $route, $window, $location, tradingService) {

        $scope.form = {};

        $scope.signIn = function() {
            tradingService.doLogin($scope.form).then(function() {
                $scope.form = {};
                $location.path('/home');
            });
        };

    }]);

function refreshUserDetails(tradingService, $rootScope) {
    tradingService.userDetails().then(function (data) {
        $rootScope.userDetails = data;
        $rootScope.userDetails.displayName = data.fullName ? data.fullName : data.userName;
    });
}
tradingControllers.controller('barController', ['$scope', '$rootScope', '$route', '$routeParams' ,'$window','$location', 'tradingService',
    function ($scope, $rootScope, $route, $routeParams , $window, $location, tradingService) {

        $rootScope.userDetails = {};

        refreshUserDetails(tradingService, $rootScope);

        $scope.logout = function () {
            tradingService.doLogout().then(function() {
                $location.path('/home');
            });
        };

    }]);