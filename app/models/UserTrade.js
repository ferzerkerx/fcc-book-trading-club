'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserTrade = new Schema({
    user_book: ObjectId,
    borrower: ObjectId,
    status: String
});

module.exports = mongoose.model('UserTrade', UserTrade);