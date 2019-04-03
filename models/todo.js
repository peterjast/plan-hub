module.exports = function(sequelize, DataTypes) {
  var ToDo = sequelize.define("ToDo", {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  ToDo.associate = function(models) {
    ToDo.belongsTo(models.Accounts, {
      foreignKey: "owner_id"
    });
  };
  return ToDo;
};
