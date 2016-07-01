'use strict';

var path = process.cwd();
var ApiService = require(path + '/app/service/ApiService.js');



module.exports = function (app) {

    function nocache(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }

    var apiService = new ApiService();

    app.route('/api/my-books/')
        .post(apiService.addBook);

    app.route('/api/my-books/:selectedBookId')
        .delete(apiService.removeBook);

    app.route('/api/my-books/')
        .get(nocache, apiService.listMyBooks);

    app.route('/api/userDetails')
        .get(nocache, apiService.userDetails);

    app.route('/api/logout')
        .get(apiService.doLogout);

    app.route('/api/login')
        .get(apiService.doLogin);

};