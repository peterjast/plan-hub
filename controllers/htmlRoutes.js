var db = require("../models");

module.exports = function(app) {
  app.get("/createtasks", function(req, res) {
    if (req.isAuthenticated()) {
      db.User.findByPk(req.user.uuid).then(function(dbUser) {
        dbUser.getToDos().then(function(dbToDo) {
          // console.log("dbToDo", dbToDo);

          var hbsObj = {
            todos: [],
            completed: [],
            user: req.user,
            id: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          };
          dbToDo.forEach(function(task) {
            if (task.completed) {
              hbsObj.completed.push(task.dataValues);
            } else {
              hbsObj.todos.push(task.dataValues);
            }
          });
          res.render("createtasks", hbsObj);
        });
      });
    } else {
      res.redirect("login");
    }
  });

  app.get("/justin", function(req, res) {
    res.render("createtasks", {});
  });
};
