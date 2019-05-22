const router = require('express').Router();
const ExtendSimController = require('../../controllers/ExtendSimController');

router.route('/createScenarioFolder').post(ExtendSimController.createScenarioFolder);
router.route('/copyModelToScenarioFolder').post(ExtendSimController.copyModelToScenarioFolder);
router.route('/sendfile').post(ExtendSimController.sendfile);
router.route('/submitsimulationscenario').post(ExtendSimController.submitsimulationscenario);
router.route('/checkmodelrunstatus').post(ExtendSimController.checkmodelrunstatus);

module.exports = router;
