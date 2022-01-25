const express = require('express');
const Tag = require('../models/Tag');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).send(tags);
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте позже'
        });
    }
});

module.exports = router;