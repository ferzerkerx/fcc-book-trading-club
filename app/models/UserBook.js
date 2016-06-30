'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserBook = new Schema({
    name: String,
    book_id: String,
    img_url: String,
    owner: ObjectId
});

module.exports = mongoose.model('UserBook', UserBook);