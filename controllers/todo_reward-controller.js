var express = require("express");
var router = express.Router();

var passport = 

var todo = require("../models/todo.js");
var reward = require("../models/reward.js");

//Create routes for Todo items

router.get("/", function(req, res) {
  todo.selectAll(function(data) {
    var hbsObject = {
      todos: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/todo/insertOne", function(req, res) {
  todo.insertOne(
    ["todo_item"],
    [req.body.name],

    function(result) {
      res.redirect("/");
    }
  );
});

router.post("//updateOne/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  todo.updateOne(
    {
      completed: req.body.devoured
    },
    condition,
    function(result) {
      res.redirect("/");
    }
  );
});
//to update the rewards section of the dashboard - after a user enters a reward it populates the database and updates the kids dashboard
//add new reward

router.post("/reward/insertOne", function(req, res) {
  reward.insertOne(
    ["reward_item"],
    [req.body.name],

    function(result) {
      res.redirect("/");
    }
  );
});

//delete a reward
app.delete("/reward/", function(req, res) {
  db.reward.destroy({
    where: {
      id: req.params.reward
    }
  }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  })
});
}


module.exports = router;
