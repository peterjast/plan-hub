var db = require("../models");
var passport = require("passport");

module.exports = function(app) {

  //Brings to add-items form.
  app.get("/createtasks", function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render("createtasks", user);
    } else {
      res.redirect("/");
    }
  });

  //Posting task to table.
  app.post("/createtasks", function(req, res) {
    console.log(req.body);
    console.log("is logged in", req.isAuthenticated());
    if (req.isAuthenticated()) {
      var user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      db.ToDo.create({
        task: req.body.task,
        completed: req.body.completed,
        owner_id: req.session.passport.user
      }).then(function(dbToDo) {
        res.redirect("/createtasks");
      });
    } else {
      res.redirect("/");
    }
  });

  //Delete an item.
  app.delete("/createtasks/:task_id", function(req, res) {
    db.ToDo.destroy({
      where: {
        id: req.params.task_id
      }
    }).then(function(result) {
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
};
