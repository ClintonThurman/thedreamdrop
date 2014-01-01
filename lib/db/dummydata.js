'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Nfo = mongoose.model('Nfo'),
    Tag = mongoose.model('Tag'),
    Category = mongoose.model('Category');

//Clear old things, then add things in
Thing.find({}).remove(function() {
	Thing.create({ 
		name : 'HTML5 Boilerplate',
		info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
		awesomeness: 10
	}, {
		name : 'AngularJS',
		info : 'AngularJS is a toolset for building the framework most suited to your application development.',
		awesomeness: 10
	}, {
		name : 'Karma',
		info : 'Spectacular Test Runner for JavaScript.',
		awesomeness: 10
	}, {
		name : 'Express',
		info : 'Flexible and minimalist web application framework for node.js.',
		awesomeness: 10
	}, {
		name : 'MongoDB + Mongoose',
		info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
		awesomeness: 10
	}, function() {
			console.log('finished populating things');
		}
	);
});

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

