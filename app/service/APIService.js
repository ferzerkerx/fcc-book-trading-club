'use strict';

var path = process.cwd();
var UserBook = require(path + '/app/models/UserBook.js');
var qs = require("qs");

function ApiService () {

    this.userDetails = function(req, res) {
        var session = req.session;
        var userDetails = {
            name: undefined,
            isLogged: false
        };
        if (session.hasOwnProperty('userData')) {
            userDetails.isLogged = true;
            userDetails.name = session.userData.name;
            userDetails.username = session.userData.userName;
        }
        return res.json(userDetails);

    };

    this.doLogout = function(req, res) {
        req.session.destroy();
        return res.json({status: 'ok'});
    };
}

module.exports = ApiService;