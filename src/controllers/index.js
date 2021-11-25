const { Router } = require('express');
const homeController = require('./home.controller');
const productsController = require('./cart.controller');

const router = Router();

router.use('/', homeController);
router.use('/cart', productsController);

module.exports = router;