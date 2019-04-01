module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT
  });

  User.associate = function(models) {
    //Accociating Users with Todos
    //When a user is delted, also delte any associated todos
    User.hasMany(models.Todo, {
      onDelete: "cascade"
    });
  };
  return User;
};
