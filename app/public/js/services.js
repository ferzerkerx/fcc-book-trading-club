
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

        var addBook = function(bookName) {
            var url = appContext + '/api/my-books/';
            return $http.post(url, {bookName: bookName}).then(function (response) {
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

        var signUp = function(settings) {
            var url = appContext + '/api/user/';
            return $http.post(url, settings).then(function (response) {
                return response.data;
            });
        };


        return {
            addBook: addBook,
            removeBook: removeBook,
            listMyBooks: listMyBooks,
            listAllBooks: listAllBooks,
            signUp: signUp,
            updateSettings: updateSettings,
            userDetails: userDetails,
            doLogin: doLogin,
            doLogout: doLogout
        };
    }]);

