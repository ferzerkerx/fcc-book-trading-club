'use strict';

var path = process.cwd();
var UserBook = require(path + '/app/models/UserBook.js');
var User = require(path + '/app/models/User.js');
var qs = require("qs");
var request = require("request");

function ApiService () {

    var googleApiKey = process.env.GOOGLE_API_KEY;

    this.addBook = function(req, res) {

        var bookName = req.body.bookName;

        request('https://www.googleapis.com/books/v1/volumes?maxResults=1&q='+ bookName+'&key='+ googleApiKey,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var bookResults = JSON.parse(body);
                    console.log(JSON.stringify(bookResults));
                    var items = bookResults.items;
                    if (items.length == 0) {
                        return res.json({});
                    }
                    var selectedBook = items[0];

                    var userBook = new UserBook({
                        owner: req.session.userData.id,
                        name: selectedBook.volumeInfo.title,
                        book_id: selectedBook.id,
                        img_url: selectedBook.volumeInfo.imageLinks.thumbnail
                    });

                    userBook.save(function (err, book) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        return res.json(book);
                    });
                }
            });
    };

    this.listMyBooks = function(req, res) {
        UserBook.find({owner:req.session.userData.id}, function(err, polls){
            if (err) {
                console.log(err);
                return res.json(500, {});
            }
            return res.json(polls);
        });
    };

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

    this.doLogin = function(req, res) {
        //TODO remove hardcode
        req.session.userData = {
            name: 'SomeName',
            userName: 'userName',
            id: '5775538f216b47541f2ad871'

        };
        return res.json({status: 'ok'});
    };
}

module.exports = ApiService;