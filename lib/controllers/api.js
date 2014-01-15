'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    nfo = mongoose.model('Nfo'),
    tag = mongoose.model('Tag'),
    category = mongoose.model('Category'),
    dream = mongoose.model('Dream'),
    async = require('async');


exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};


exports.getdata = function(req, res) {
    var typeJSON = {};

    if (req.query.type != null && req.query.type.length > 0 ) {
        try {
            typeJSON = JSON.parse(decodeURIComponent(req.query.type));
            console.log(typeJSON);
        } catch (err) {
            console.log('initdata: there was a problem with the type data');
        }
    };

    async.parallel(
        {
            nfo:function(callback) {
                if (typeJSON.nfo) {
                    nfo.find({}, { '_id': 0},
                        function (err, nfos) {
                            if (err) return callback(err);

                            return callback(null, nfos);
                        });
                } else {
                    // not sure if this is right
                    callback(null, []);
                }
            },
            tags:function(callback) {
                if (typeJSON.tags) {
                    tag.find({}, { '_id': 0},
                        function (err, tags) {
                            if (err) return callback(err);

                            return callback(null, tags);
                        });
                } else {
                    // not sure if this is right
                    callback(null, []);
                }
            },
            categories:function(callback) {
                if (typeJSON.categories) {
                    category.find({}, { '_id': 0},
                        function (err, categories) {
                            if (err) return callback(err);

                            return callback(null, categories);
                        });
                } else {
                    // not sure if this is right
                    callback(null, []);
                }
            },
            dreams:function(callback) {
                if (typeJSON.dreams) {
                    dream.find({}, {}, {sort:{'dateCreated':-1}, limit: 12},
                        function (err, dreams) {
                            if (err) return callback(err);

                            return callback(null, dreams);
                        });
                } else {
                    // not sure if this is right
                    callback(null, []);
                }
            }
        },
        function(err, results) {
            //This function gets called after all tasks have called their "task callbacks"
            var outJSON = {};

            // todo: not sure if we need this anymore... cleanup
            if (err){
                // Close the db connection on error
                //db.close();
                return next(err); //If an error occured, we let express/connect handle it by calling the "next" function
            }

            outJSON.nfo = (typeJSON.nfo)? results.nfo[0]:null;
            outJSON.tags = (typeJSON.tags)? results.tags:null;
            outJSON.categories = (typeJSON.categories)? results.categories:null;
            outJSON.dreams = (typeJSON.dreams)? results.dreams:null;

            // Respond to the frontend request
            // todo: respond with possible failure message
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(outJSON));
        }
    );
};

exports.postdata = function(req, res) {
    var date = new Date(),
        doc = {
            dream: req.body.dream,
            selectedTags: req.body.selectedTags,
            location: req.body.location,
            signature: req.body.signature,
            dateCreated: date,
            dateUpdated: date
        },
        entry = new dream(doc);

    entry.save(function (err) {
        res.setHeader("Content-Type", "application/json");

        if (err) {
            // TODO handle err
            res.send(JSON.stringify({"success":false}));
            console.log('error saving dream entry: ' + err);
        } else {
            // Respond to the post request
            // todo: respond with success/failure message
            res.send(JSON.stringify({"success":true}));
            console.log('dream entry saved');
        }
    });
};
