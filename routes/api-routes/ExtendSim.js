const router = require('express').Router();
const ExtendSimController = require('../../controllers/ExtendSimController');

router.route('/createScenarioFolder').post(ExtendSimController.createScenarioFolder);
router.route('/copyModelToScenarioFolder').post(ExtendSimController.copyModelToScenarioFolder);
router.route('/sendfile').post(ExtendSimController.sendfile);
router.route('/submitsimulationscenario').post(ExtendSimController.submitsimulationscenario);
router.route('/checkmodelrunstatus').post(ExtendSimController.checkmodelrunstatus);
router.route('/getuserscenarios').post(ExtendSimController.getuserscenarios);
router.route('/getscenarioresults').post(ExtendSimController.getscenarioresults);
module.exports = router;
