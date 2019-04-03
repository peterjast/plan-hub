var LocalStrategy = require("passport-local").Strategy;

var db  = require("../models");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.uuid);
    });

    passport.deserializeUser(function(uuid, done) {
        db.Accounts.findById(uuid).then(function(user) {
	        if (user) {
	            done(null, user.get());
	        } else {
	            done(user.errors, null);
	        }
	    });
    });

    //Register for an user
    passport.use("local-signup", new LocalStrategy({
        usernameField: "username",
        emailField: "email",
        passwordField : "account_key",
        passReqToCallback : true
    }, 
    function(req, username, account_key, done) {
        process.nextTick(function() {
        db.Accounts.findOne({
            where: {
            	username: username
            }
        }).then(function(user, err){
        	if(err) {
                console.log("err",err)
                return done(err);
            } 
            if (user) {
            	console.log("signupMessage", "Sorry... that username is already taken.");
                return done(null, false, req.flash("signupMessage", "Sorry... that username is already taken."));
            } else {
                db.Accounts.create({
                username: req.body.username,    
			    email: req.body.email,
			    account_key: db.users.generateHash(account_key)

						    }).then(function(dbUser) {
						    		      
	return done(null, dbUser);  

    }).catch(function (err) { console.log(err);}); 
            }
          });   
        });
    }));

    //log in to your
    passport.use("local-login", new LocalStrategy({
            usernameField: "username",
            passwordField : "account_key",
            passReqToCallback : true 
    }, 
    function(req, username, account_key, done) { 
            db.Accounts.findOne({
                where: {
                    username: req.body.username 
                }
            }).then(function(user, err) {
                (!user.validPassword(req.body.account_key)));
                if (!user){
                    console.log("no user found");
                    return done(null, false, req.flash("loginMessage", "It looks like that username doesn't exist!")); 
                }
                if (user && !user.validPassword(req.body.account_key)){
                return done(null, false, req.flash("loginMessage", "Oops! Wrong password.")); 
                }        
            return done(null, user);
        });
    }));

};