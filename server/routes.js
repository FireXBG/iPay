const router = require('express').Router();
const authController = require('./controllers/authController');
const assetsController = require('./controllers/assetController');

router.use('/auth', authController);
router.use('/assets', assetsController);

module.exports = router;