module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return user;
};
