var db = require("../models");

module.exports = function(app) {
  //Create routing for the login-create username

  //Create a new user on the login screen
  app.post("api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create routing for the parents page

  // Create a new todo for user
  app.post("/api/user/:id/todo", function(req, res) {
    db.Todo.create(req.body).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // Delete an example by id
  app.delete("/api/todo/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // Create a new reward for user
  app.post("/api/user/:id/reward", function(req, res) {
    db.Rewared.create(req.body).then(function(dbReward) {
      res.json(dbReward);
    });
  });

  // Create Kids dashboard

  // Get all todos for user
  app.get("/api/user/:id/todo", function(req, res) {
    db.Todo.findAll({ where: { UserId: req.params.id } }).then(function(
      dbTodos
    ) {
      res.json(dbTodos);
    });
  });

  app.put("api/todo/:id", function(req, res) {
    db.Todo.findByPk(req.params.id).then(function(todo) {
      todo.completed = req.body;
      todo.save({ fields: ["completed"] }).then(function() {
        res.json(todo);
      });
    });
  });
};
