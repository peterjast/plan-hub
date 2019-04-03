var db = require("../models");

var passport = require("passport");

module.exports = function(app) {
  app.get("/home", function (req, res) {
    if (req.isAuthenticated()) {
      db.ToDo.findAll({}).then(function (dbToDo) {
        console.log("dbToDo", dbToDo);

        var hbsObj = {
          ToDo: [],
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()

        };
        dbToDo.forEach(function(task){
          hbsObj.ToDo.push(task.dataValues);
        });

        res.render("home", hbsObj);
      });
    } else {
      res.redirect("/");
    }
  });
};

//add logic to sort completes vs dbToDo