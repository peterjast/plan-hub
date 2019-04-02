// var db = require("../models");

module.exports = function(app){
    app.get("/", function(req,res){
        if(req.isAuthenticated()){
            var user = {
                id: req.session.passport.user,
                isloggedin: req.isAuthenticated()
            };
            res.render("home", user);
        }
        else{
            res.render("login");
        }
    });

    app.get("/list-items", function(req,res){
        res.render("search");
    });

    app.get("/signup", function(req,res){
        if(req.isAuthenticated()){
            res.redirect("/acounts/view");
        }else{
           res.render("accounts"); 
        }
    });

    app.get("/add-items", function(req, res){
        if(req.isAuthenticated()){
            res.render("add-items");
        }else {
            res.redirect()
        }
    })

    app.get("/justin-test", function(req, res) {
      res.render("createtasks", {});
    })
};


/* var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.post("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // *Sonja* Create login for (users that have already been created)
  app.post("/login", function(req, res) {
    db.User.findOne({
      where: { email: req.body.email, password: req.body.password }
    }).then(function(user) {
      if (user) {
        console.log("Logged in!");
        // Create login session
        res.redirect("/");
      } else {
        console.log("Invalid username or password!");
        res.redirect("/login-error");
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
*/