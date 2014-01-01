'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema
var DreamSchema = new Schema({
    dream: String,
    selectedTags: {
        emotions: [String],
        who: [String],
        happened: [String],
        when: [String],
        where: [String],
        what: [String],
        how: [String]
    },
    signature: String,
    location: {
        locality: {
            long_name: String,
            short_name: String
        },
        administrative_area_level_2: {
            long_name: String,
            short_name: String
        },
        administrative_area_level_1: {
            long_name: String,
            short_name: String
        },
        country: {
            long_name: String,
            short_name: String
        },
        postal_code: {
            long_name: String,
            short_name: String
        }
    },
    dateCreated: Date,
    dateUpdated: Date
});

mongoose.model('Dream', DreamSchema);