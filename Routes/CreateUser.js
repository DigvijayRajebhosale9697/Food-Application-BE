import express from 'express';
const router = express.Router();
import User from '../Models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWTSecret = "JwTsEcRet";

router.post('/createUser', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', 'Password Length is Of Minimum 6 Characters').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        const { name, location, email } = req.body;

        const newUser = await User.create({
            name,
            location,
            password: securedPassword,
            email,
        });

        res.status(201).json({ success: true, newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/loginUser', [
    body('email').isEmail(),
    body('password', 'Password Length is Of Minimum 6 Characters').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { password, email } = req.body;

        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ errors: 'TRY TO LOGIN WITH CORRECT CREDENTIALS' });
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(400).json({ errors: 'TRY TO LOGIN WITH CORRECT PASSWORD' });
        }

        const payload = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(payload, JWTSecret);

        return res.status(200).json({ success: true, authToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
