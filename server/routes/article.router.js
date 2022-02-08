const express = require('express');
const auth = require('../middleware/auth.middleware');
const Article = require('../models/Article');
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(async (req, res) => {
        try {
            const articles = await Article.find();
            res.status(200).send(articles);
        } catch (error) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте позже'
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newArticle = await Article.create({
                ...req.body,
                userId: req.user._id
            });
            res.status(200).send(newArticle);
            
        } catch (error) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте позже'
            });
        }
    });

router.delete('/:articleId', auth, async (req, res) => {
    try {
        const { articleId } = req.params;        
        const removedArticle = await Article.findById(articleId);

        if (removedArticle.userId.toString() === req.user._id) {
            await removedArticle.remove();
            return res.send(null);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (e) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте позже'
        });
    }
})


module.exports = router;