'use strict';

var mongoose = require('mongoose'),
    Nfo = mongoose.model('Nfo'),
    Tag = mongoose.model('Tag'),
    Category = mongoose.model('Category');

Nfo.find({}).remove(function() {
    Nfo.create(require('./nfodata')
        ,
        function() {
            console.log('finished populating nfos');
        }
    );
});

Category.find({}).remove(function() {
    Category.create(require('./categorydata'),
        function() {
            console.log('finished populating categories');
        }
    );
});

Tag.find({}).remove(function() {
    Tag.create(
        require('./tagdata'),
        function() {
            console.log('finished populating tags');
        }
    );
});

