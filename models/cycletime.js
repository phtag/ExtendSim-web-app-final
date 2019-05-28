module.exports = function(sequelize, DataTypes) {
  var cycletime = sequelize.define("cycletime", {
    scenarioID: DataTypes.STRING,
    userLoginSessionID: DataTypes.STRING,
    stepname: DataTypes.STRING,
    resourceRequirement: DataTypes.STRING,
    totalJobsProcessed: DataTypes.INTEGER,
    totalProcessTime: DataTypes.REAL,
    totalWaitTime: DataTypes.REAL,
    avgProcessTime: DataTypes.REAL,
    avgWaitTime: DataTypes.REAL,
    avgCycleTime: DataTypes.REAL,
    CoVarrivals: DataTypes.REAL,
    CoVdepartures: DataTypes.REAL
  });
  return cycletime;
};
