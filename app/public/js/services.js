
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

        var doLogin = function() {
            var url = appContext + '/api/login';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        };

        return {
            userDetails: userDetails,
            doLogin: doLogin
        };
    }]);

