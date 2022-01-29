const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const tokenService = require('../services/token.service');
const { generateRandomImg } = require('../utils/randomImg');
const router = express.Router({ mergeParams: true });

router.post('/signUp', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'INVALID_DATA'
                });
            }

            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: 'EMAIL_EXISTS'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                ...generateRandomImg,
                ...req.body,
                password: hashedPassword
            });

            const tokens = tokenService.generate( { _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({ ...tokens, userId: newUser._id});
            
        } catch (error) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте позже'
            });
        }
}]);

router.post('/signIn', [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Пароль не может быть пустым').exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'INVALID_DATA'
                });
            }

            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: 'EMAIL_NOT_FOUND'
                });
            }

            const isPasswordEqual = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordEqual) {
                return res.status(400).json({
                    message: 'INVALID_PASSWORD'
                }); 
            }

            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            res.status(200).send({ ...tokens, userId: existingUser._id });
            
        } catch (error) {
            res.status(500).json({
                message: 'Что-то пошло не так, попробуйте позже'
            });
        }
}]);

router.post('/token', async (req, res) => {
    try {

        const { refreshToken } = req.body;
        const data = tokenService.validateRefreshToken(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (!data || !dbToken || data._id === dbToken?.user?.toString()) {
            return res.status(400).json({
                message: 'Unauthorized'
            })
        }

        const tokens = tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);

        res.status(200).send({ ...tokens, userId: data._id });
   
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте позже'
        });
    }
});

module.exports = router;
