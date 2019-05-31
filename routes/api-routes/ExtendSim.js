const router = require('express').Router();
const ExtendSimController = require('../../controllers/ExtendSimController');

router.route('/createScenarioFolder').post(ExtendSimController.createScenarioFolder);
router.route('/copyModelToScenarioFolder').post(ExtendSimController.copyModelToScenarioFolder);
router.route('/sendfile').post(ExtendSimController.sendfile);
router.route('/submitsimulationscenario').post(ExtendSimController.submitsimulationscenario);
router.route('/checkmodelrunstatus').post(ExtendSimController.checkmodelrunstatus);
router.route('/getuserscenarios').post(ExtendSimController.getuserscenarios);
router.route('/getcycletimeresults').post(ExtendSimController.getcycletimeresults);
router.route('/getresourceresults').post(ExtendSimController.getresourceresults);
router.route('/getpoolresults').post(ExtendSimController.getpoolresults);
router.route('/getmodelresults').post(ExtendSimController.getmodelresults);
router.route('/getscenariocycletimedata').post(ExtendSimController.getscenariocycletimedata);
module.exports = router;
