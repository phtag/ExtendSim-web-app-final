const router = require('express').Router();
const serverController = require('../../controllers/serverController');
const isAuthenticated = require('../../controllers/authentication');

// router.route('/createscenario').post(serverController.createscenario);
// router.route('/createscenario').get(isAuthenticated, serverController.createscenario);
router.route('/createscenario').post(isAuthenticated, serverController.createscenario);

module.exports = router;
