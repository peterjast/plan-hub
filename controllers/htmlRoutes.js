module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render("home", user);
    } else {
      res.render("login");
    }
  });

  app.get("/home", function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect("home");
    } else {
      res.render("login");
    }
  });

  app.get("/createtasks", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("createtasks");
    } else {
      res.redirect("login");
    }
  });

  app.get("/register", function(req, res) {
    res.render("register", {});
  });

  app.get("/login", function(req, res) {
    res.render("login", {});
  });

  app.get("/justin", function(req, res) {
    res.render("createtasks", {});
  });
};
