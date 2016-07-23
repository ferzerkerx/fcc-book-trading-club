
'use strict';

/* Services */

var tradingServices = angular.module('tradingServices', ['ngResource']);

tradingServices.factory('tradingService', ['$http', '$location',
    function($http, $location) {

        var appContext = $location.absUrl();
        if (appContext.indexOf("#")) {
            appContext =  appContext.substring(0, appContext.indexOf("#") - 1);
        }

        var userDetails = function() {
            var url = appContext + '/api/userDetails';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        };

        var doLogin = function(data) {
            var url = appContext + '/api/login';
            return $http.post(url, data).then(function (response) {
                return response.data;
            });
        };

        var doLogout = function() {
            var url = appContext + '/api/logout';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        };

        var addUserBook = function(bookName) {
            var url = appContext + '/api/my-books/';
            return $http.post(url, {bookName: bookName}).then(function (response) {
                return response.data;
            });
        };

        var denyTrade = function(tradeId) {
            var url = appContext + '/api/decline-trade';
            return $http.put(url, {userTradeId: tradeId}).then(function (response) {
                return response.data;
            });
        };

        var acceptTrade = function(tradeId) {
            var url = appContext + '/api/accept-trade';
            return $http.put(url, {userTradeId: tradeId}).then(function (response) {
                return response.data;
            });
        };

        var removeBook = function(bookId) {
            var url = appContext + '/api/my-books/' + bookId;
            return $http.delete(url).then(function (response) {
                return response.data;
            });
        };

        var listMyBooks = function() {
            var url = appContext + '/api/my-books/';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        };

        var listAllBooks = function() {
            var url = appContext + '/api/all-books/';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        };

        var updateSettings = function(settings) {
            var url = appContext + '/api/my-settings/';
            return $http.put(url, settings).then(function (response) {
                return response.data;
            });
        };

        var listMyTrades = function() {
            var url = appContext + '/api/my-trades';
            return $http.get(url).then(function (response) {

                var data = response.data;
                var trades =  data['trades'];
                var books =  data['books'];

                var mappedBooks = {};
                books.forEach(function(e) {
                    mappedBooks[e["_id"]] = e;
                });

                var acceptedTrades = trades.filter(function(e) {
                    return e.isAccepted;
                });

                var pendingTrades = trades.filter(function(e) {
                    return e.isPending;
                });

                return {
                    trades: {
                        acceptedTrades: acceptedTrades,
                        pendingTrades: pendingTrades
                    },
                    books: mappedBooks
                };
            });
        };

        var proposeTrade = function(bookId) {
            var url = appContext + '/api/propose-trade';
            return $http.post(url, {book_id: bookId}).then(function (response) {
                return response.data;
            });
        };

        var signUp = function(settings) {
            var url = appContext + '/api/user/';
            return $http.post(url, settings).then(function (response) {
                return response.data;
            });
        };


        return {
            denyTrade: denyTrade,
            acceptTrade: acceptTrade,
            addUserBook: addUserBook,
            removeBook: removeBook,
            listMyBooks: listMyBooks,
            listAllBooks: listAllBooks,

            listMyTrades: listMyTrades,
            proposeTrade: proposeTrade,

            signUp: signUp,
            updateSettings: updateSettings,
            userDetails: userDetails,
            doLogin: doLogin,
            doLogout: doLogout
        };
    }]);

