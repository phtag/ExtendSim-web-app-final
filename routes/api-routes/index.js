const router = require('express').Router();
const postRoutes = require('./posts');
const userRoutes = require('./users');
const serverRoutes = require('./server');
const ExtendSimRoutes = require('./ExtendSim');

// Book routes
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/server', serverRoutes);
router.use('/ExtendSim', ExtendSimRoutes);

module.exports = router;
