var db = require("../models");

var passport = require('passport');

module.exports = function (app) {

    app.get("/register", function (req, res) {
        res.render("register");
    });

    app.get("/login", function (req, res) {
        res.render("login");
    });

        // logout of user account
        app.get('/logout', function(req, res) {
            req.session.destroy(function(err){
              req.logout();
              res.clearCookie('user_sid');
              res.clearCookie('username');
              res.clearCookie('user_id');
              res.redirect('/');
            })
        });
    
    
    
    // process the signup form ==============================================
    //=======================================================================
    
      app.post('/register', function(req, res, next) {
        passport.authorize('local-signup', function(err, user, info) {
          console.log("info", info);
          if (err) {
            console.log("passport err", err);
            return next(err); // will generate a 500 error
          }
          // Generate a JSON response reflecting authentication status
          if (! user) {
            console.log("user error", user);
            return res.send({ success : false, message : 'authentication failed' });
          }
          
          // ***********************************************************************
          // "Note that when using a custom callback, it becomes the application's
          // responsibility to establish a session (by calling req.login()) and send
          // a response."
          // Source: http://passportjs.org/docs
          // ***********************************************************************
    
          req.login(user, loginErr => {
            if (loginErr) {
              console.log("loginerr", loginerr)
              return next(loginErr);
            }
            //var userId = user.dataValues.id;
            console.log('redirecting....');
            
            res.cookie('username', user.username);
            res.cookie('user_id', user.uuid );
            return res.redirect("/");
          });      
        })(req, res, next);
      });
    
      app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
          console.log("\n\n\n########userrrr", user)
          if (err) {
            console.log("passport err", err);
            return next(err); // will generate a 500 error
          }
          // Generate a JSON response reflecting authentication status
    
          if (!user) {
    
            return res.send({ success : false, message : 'authentication failed'});
          }
          
          // ***********************************************************************
          // "Note that when using a custom callback, it becomes the application's
          // responsibility to establish a session (by calling req.login()) and send
          // a response."
          // Source: http://passportjs.org/docs
          // ***********************************************************************
    
          req.login(user, loginErr => {
            if (loginErr) {
              console.log("loginerr", loginErr)
              return next(loginErr);
            }
            //var userId = user.dataValues.id;
            console.log('redirecting....')
            res.cookie('username', user.username);
            res.cookie('user_id', user.uuid );
    
            // if (!req.session.userid) {
            //   var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
            //   delete req.session.redirectTo;
            //   // is authenticated ?
            //   res.redirect(redirectTo);
            // } else {
            //     next();
            // }
            // console.log("=====================signup: ",req.headers.referer);
            return res.redirect("/");
            // return res.redirect("/account");
            
          });      
        })(req, res, next);
      });
    
    }