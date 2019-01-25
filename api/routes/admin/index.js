var router = require('express').Router();

// LIST all routes
router.use('/list', require('./list'));

module.exports = router;
