'use strict';

var path = process.cwd();
var ApiService = require(path + '/app/service/ApiService.js');

module.exports = function (app) {

    var apiService = new ApiService();

    app.route('/api/my-books/')
        .post(apiService.addBook);

    app.route('/api/my-books/')
        .get(apiService.listMyBooks);

    app.route('/api/userDetails')
        .get(apiService.userDetails);

    app.route('/api/logout')
        .get(apiService.doLogout);

    app.route('/api/login')
        .get(apiService.doLogin);

};