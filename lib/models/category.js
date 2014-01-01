'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema
var CategorySchema = new Schema({
    key: String,
    value: {
        en_US: String
    },
    tags: Array
});

mongoose.model('Category', CategorySchema);
