module.exports = function(app) {
  app.get("/createtasks", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("createtasks");
    } else {
      res.redirect("login");
    }
  });

  app.get("/justin", function(req, res) {
    res.render("createtasks", {});
  });
};
