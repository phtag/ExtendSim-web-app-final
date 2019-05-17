const router = require('express').Router();
const usersController = require('../../controllers/ExtendSimController');

router.route('/createScenarioFolder').post(usersController.createScenarioFolder);
router.route('/copyModelToScenarioFolder').post(usersController.copyModelToScenarioFolder);

module.exports = router;
