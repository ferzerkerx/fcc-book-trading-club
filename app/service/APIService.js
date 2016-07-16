'use strict';

var path = process.cwd();
var UserBook = require(path + '/app/models/UserBook.js');
var User = require(path + '/app/models/User.js');
var UserTrade = require(path + '/app/models/UserTrade.js');
var ObjectId = require('mongodb').ObjectID;
var qs = require("qs");
//var bcrypt = require("bcrypt");
var request = require("request");

function ApiService () {

    var googleApiKey = process.env.GOOGLE_API_KEY;

    this.removeBook = function(req, res) {
        var filters = {owner: req.session.userData.id, book_id: req.params.selectedBookId};
        UserBook.findOneAndRemove(filters, function(err, book) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(book);
        });
    };

    function setUserSessionData(req, user) {
        req.session.userData = {
            id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            city: user.city,
            state: user.state
        };
    }

    this.updateUserSettings = function(req, res) {
        var updateFields = {
            fullName: req.body.fullName,
            city: req.body.city,
            state: req.body.state
        };
        User.findOneAndUpdate({_id: req.session.userData.id},
            updateFields, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                user.fullName = updateFields.fullName;
                user.city = updateFields.city;
                user.state = updateFields.state;

                setUserSessionData(req, user);
                return res.json(user);
            });

    };

    this.addUserBook = function(req, res) {

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
        UserBook.find({owner:req.session.userData.id}, function(err, books){
            if (err) {
                console.log(err);
                return res.json(500, {});
            }
            return res.json(books);
        });
    };

    this.proposeTrade = function(req, res) {

        var userTrade = new UserTrade({
            user_book: req.body.book_id,
            borrower: req.session.userData.id,
            status: 'Pending'
        });

        userTrade.save(function (err, userTrade) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(userTrade);
        });
    };

    function updateUserTrade(userTradeId, updateFields, res) {
        User.findOneAndUpdate({_id: userTradeId},
            updateFields, function (err, userTrade) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                return res.json(userTrade);
            });
    }

    this.acceptTrade = function(req, res) {
        var updateFields = {status: 'Accepted'};
        var userTradeId = req.params.userTradeId;
        updateUserTrade(userTradeId, updateFields, res);
    };

    this.declineTrade = function(req, res) {
        var updateFields = {status: 'Declined'};
        var userTradeId = req.params.userTradeId;
        updateUserTrade(userTradeId, updateFields, res);
    };

    this.endTrade = function(req, res) {
        var updateFields = {status: 'Finished'};
        var userTradeId = req.params.userTradeId;
        updateUserTrade(userTradeId, updateFields, res);
    };


    this.listAllMyTrades = function(req, res) {
        var currentUserId = ObjectId(req.session.userData.id);

        var trades = [];
        var bookIds = [];
        UserBook.find({owner: currentUserId}).exec()
            .then(function findActiveTradesForCurrentUser(userBooks) {

                var ownedBooksIds = userBooks.map(function mapToId(element) {
                    return element._id;
                });

                var conditions = {
                    $and: [
                        {$or: [{'user_book': {"$in": ownedBooksIds}}, {borrower: currentUserId}]},
                        {$or: [{status: 'Pending'}, {status: 'Accepted'}]}
                    ]
                };
                return UserTrade.find(conditions).exec()
            })
            .then(function prepareTradeData(userTrades) {
                userTrades.forEach(function (trade) {
                    bookIds.push(trade.user_book);
                    var elemData = {
                        _id: trade._id,
                        user_book: trade.user_book,
                        status: trade.status,
                        isBorrower: trade.borrower === currentUserId,
                        isPending: trade.status === 'Pending',
                        isAccepted: trade.status === 'Accepted'

                    };
                    trades.push(elemData);
                });
            })
            .then(function findBookDetailsByIds() {
                return UserBook.find({"_id": {"$in": bookIds}}).exec();
            })
            .then(function writeTradeDataToResponse(userBooks) {
                var result = {
                    trades: trades,
                    books: userBooks
                };
                return res.json(result);
            })
            .catch(function (err) {
                console.log(err);
                return res.json(500, {});
            });
    };

    this.listAllBooks = function(req, res) {
        UserBook.find({}, function(err, books){
            if (err) {
                console.log(err);
                return res.json(500, {});
            }
            return res.json(books);
        });
    };

    this.userDetails = function(req, res) {
        var session = req.session;
        var userDetails = {
            name: undefined,
            isLogged: false,
            fullName: undefined,
            city: undefined,
            state: undefined
        };
        if (session.hasOwnProperty('userData')) {
            userDetails.isLogged = true;
            var userData = session.userData;
            userDetails.userName = userData.userName;
            userDetails.fullName = userData.fullName;
            userDetails.city = userData.city;
            userDetails.state = userData.state;
        }
        return res.json(userDetails);

    };

    this.doLogout = function(req, res) {
        req.session.destroy();
        return res.json({status: 'ok'});
    };

    this.doLogin = function(req, res) {
        User.findOne({userName: req.body.userName}, function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            if (!user) {
                return res.status(401).json({message: 'unauthorized'});
            }
            //var doesMatch = bcrypt.compareSync(user.password, req.body.password);
            var doesMatch = user.password === req.body.password;
            if (doesMatch) {
                setUserSessionData(req, user);
            }
            return res.json({status: 'ok'});
        });
    };

    this.createUser = function(req, res) {
        var user = new User({
            userName: req.body.userName,
            //password: bcrypt.hashSync(req.body.password, 12)
            password: req.body.password
        });

        user.save(function (err, book) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(book);
        });
    };
}

module.exports = ApiService;