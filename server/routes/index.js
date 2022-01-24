const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.router'));
router.use('/articles', require('./article.router'));

module.exports = router;