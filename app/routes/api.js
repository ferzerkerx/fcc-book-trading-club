'use strict';

var path = process.cwd();
var ApiService = require(path + '/app/service/APIService.js');



module.exports = function (app) {

    function nocache(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }

    var apiService = new ApiService();

    app.route('/api/my-books/')
        .post(apiService.addUserBook);

    app.route('/api/my-settings/')
        .put(apiService.updateUserSettings);

    app.route('/api/my-books/:selectedBookId')
        .delete(apiService.removeBook);

    app.route('/api/my-books/')
        .get(nocache, apiService.listMyBooks);

    app.route('/api/all-books/')
        .get(nocache, apiService.listAllBooks);

    app.route('/api/userDetails')
        .get(nocache, apiService.userDetails);

    app.route('/api/logout')
        .get(apiService.doLogout);

    app.route('/api/login')
        .post(apiService.doLogin);

    app.route('/api/user/')
        .post(apiService.createUser);

    app.route('/api/propose-trade')
        .post(apiService.proposeTrade);

    app.route('/api/accept-trade')
        .put(apiService.acceptTrade);

    app.route('/api/decline-trade')
        .put(apiService.declineTrade);

    app.route('/api/end-trade')
        .put(apiService.endTrade);

    app.route('/api/my-trades')
        .get(apiService.listAllMyTrades);

};