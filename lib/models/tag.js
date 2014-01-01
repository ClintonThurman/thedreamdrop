'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema
var TagSchema = new Schema({
    key: String,
    weight: {
        emotional: Number,
        interest: Number,
        mature: Number
    },
    value: {
        en_US: String
    }
});

mongoose.model('Tag', TagSchema);
