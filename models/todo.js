module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    task: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  });

  Todo.associate = function(models) {
    // We're saying that a todo should belong to a user
    // A task can't be created without a user due to the foreign key constraint
    Todo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Todo;
};
