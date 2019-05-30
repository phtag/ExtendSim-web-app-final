const router = require('express').Router();
const serverController = require('../../controllers/serverController');

router.route('/createscenario').post(serverController.createscenario);

module.exports = router;
