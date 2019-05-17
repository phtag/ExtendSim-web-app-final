const router = require('express').Router();
const usersController = require('../../controllers/ExtendSimController');

router.route('/createScenarioFolder').post(usersController.createScenarioFolder);

module.exports = router;
