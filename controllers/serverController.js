var db = require('../models');

// Routes
// =============================================================
module.exports = {
  createscenario: function(req, res) {
    const { username, userLoginSessionID, scenarioName} = req.body;
    console.log("createscenario: username=" + username + " userLoginSessionID=" + userLoginSessionID + " scenarioName=" + scenarioName);
    db.scenario.create({
    userLoginSessionID: userLoginSessionID,
    username: username,
    scenarioName: scenarioName,
    scenarioID: null,
    scenarioSubmissionDataTime: null,
    scenarioCompletionDataTime: null
    })
    .then(function(dbResponse) {
        return res.json({ dbResponse: dbResponse });
    });
  },
};
