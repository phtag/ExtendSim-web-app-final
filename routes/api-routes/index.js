const router = require('express').Router();
const postRoutes = require('./posts');
const userRoutes = require('./users');
const ExtendSimRoutes = require('./ExtendSim');

// Book routes
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/ExtendSim', ExtendSimRoutes);

module.exports = router;
