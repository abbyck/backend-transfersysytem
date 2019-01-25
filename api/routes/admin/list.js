const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello from list');
});

module.exports = router;
