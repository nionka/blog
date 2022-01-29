const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });

router.patch('/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            res.send(updatedUser);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (e) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте позже'
        });
    }
})

router.get('/',auth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);

    } catch (e) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте позже'
        });
    }
})

module.exports = router;