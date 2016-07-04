'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    userName: String,
    fullName: String,
    city: String,
    state: String,
    password: String
});

module.exports = mongoose.model('User', User);