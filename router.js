// Dependencies
var express = require('express');
var  router = express.Router();
//
// Routes
router.get('/', function (req, res) {
    res.render('../views/index', { title: 'Sex Query' });
});

// Return router
module.exports = router;