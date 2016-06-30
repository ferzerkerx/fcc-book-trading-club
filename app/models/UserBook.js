'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({ name: String});

var UserBook = new Schema({
    name: String,
    owner: [User]
});

module.exports = mongoose.model('UserBook', UserBook);