'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    fullName: String,
    city: String,
    state: String
});

module.exports = mongoose.model('User', User);