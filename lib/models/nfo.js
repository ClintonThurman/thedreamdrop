'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema
var NfoSchema = new Schema({
    name: String,
    version: Number,
    dataUpdates: {
        tags: Date,
        categories: Date,
        resources: Date
    }
});

mongoose.model('Nfo', NfoSchema);
