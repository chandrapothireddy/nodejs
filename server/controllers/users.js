/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    pw = require('../helpers/passwordGenerator/passwordGenerator');

/**
 * Show login form
 */
exports.signin = function(req, res, next, passport) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info.message);
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            req.theUser = user;
            //exports.show(req, res, next);
            console.log("req.theUser"+req.theUser);
            res.send(user);

        });
    })(req, res, next);

};

/**
 * Create user
 */
exports.create = function(req, res) {

    console.log("inpost log");
    var theUser = new User(req.body);

    // generates a new random password
    //theUser.password = pw.generate(15);

    theUser.save(function(err) {

        if (err) {
            console.log(err);
        } else {
            res.send(theUser);
        }
    });

};


/**
 * List of Users
 */
exports.all = function(req, res) {
    
    var select = '';

    
    User.find({}).select(select).sort('-fullname').exec(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users);
            res.send(users);
        }
    });
};

