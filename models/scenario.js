module.exports = function(sequelize, DataTypes) {
  var scenario = sequelize.define("scenario", {
    description: DataTypes.TEXT,
    userLoginSessionID: DataTypes.STRING,
    username: DataTypes.STRING,
    scenarioName: DataTypes.STRING,
    scenarioID: DataTypes.INTEGER,
    scenarioFolderPathname: DataTypes.STRING,
    scenarioSubmissionDateTime: DataTypes.DATE,
    scenarioCompletionDateTime: DataTypes.DATE
  });
  return scenario;
};
