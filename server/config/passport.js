var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').Strategy,
    User = mongoose.model('User');

var BasicStrategy = require('passport-http').BasicStrategy;


module.exports = function(passport) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        //console.log('serialize user???');
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, function(err, user) {
            if (user._id) user.userId = user._id;
            done(err, user);
        });
    });
    
    
/*
    passport.use(new BasicStrategy(
        function(username, password, done) {
            User.findOne({
                username: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!user.authenticate(password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));
*/

    //Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                email: email
            }, function(err, user) {
			
				console.log("passport"+password);
                if (err) {
				//console.log("passporterror"+err);
                    return done(err);
					}
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid passwordd'
                    });
                }
                console.log('Founds user!');
                return done(null, user);
            });
        }
    ));

    

   


    
};
