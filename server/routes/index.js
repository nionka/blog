const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.router'));
router.use('/articles', require('./article.router'));
router.use('/tags', require('./tags.router'));
router.use('/users', require('./user.router'));

module.exports = router;