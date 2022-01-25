const express = require('express');
const Article = require('../models/Article');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте позже'
        });
    }
});

module.exports = router;