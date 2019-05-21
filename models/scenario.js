module.exports = function(sequelize, DataTypes) {
  var scenario = sequelize.define("scenario", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    userLoginSessionID: DataTypes.STRING,
    username: DataTypes.STRING,
    scenarioID: DataTypes.INTEGER,
    scenarioFolderPathname: DataTypes.STRING,
    scenarioSubmissionDataTime: DataTypes.DATE,
    scenarioCompletionDataTime: DataTypes.DATE
  });
  return scenario;
};
