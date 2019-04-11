var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.isAuthenticated()) {
      db.User.findByPk(req.user.uuid).then(function(dbUser) {
        var hbsObj = {
          todos: [],
          completed: [],
          rewards: [],
          chosen: [],
          user: req.user,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };

        dbUser.getToDos().then(function(dbToDo) {
          dbToDo.forEach(function(task) {
            if (task.completed) {
              hbsObj.completed.push(task.dataValues);
            } else {
              hbsObj.todos.push(task.dataValues);
            }
          });

          dbUser.getRewards().then(function(dbRewards) {
            dbRewards.forEach(function(reward) {
              if (reward.chosen) {
                hbsObj.chosen.push(reward.dataValues);
              } else {
                hbsObj.rewards.push(reward.dataValues);
              }
            });

            res.render("home", hbsObj);
          });
        });
      });
    } else {
      res.redirect("/login");
    }
  });
  //mark a task complete
  app.post("/task-complete/:id", function(req, res) {
    if (req.isAuthenticated()) {
      db.ToDo.findByPk(req.params.id)
        .then(function(dbTodo) {
          dbTodo.completed = true;
          dbTodo.save();
        })
        .then(function() {
          res.redirect("/");
        });
    }
  });
};
