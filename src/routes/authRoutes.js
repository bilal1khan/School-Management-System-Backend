// src/routes/authRoutes.js
const express = require('express');
const { login } = require('../controllers/authController');
const {auth} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.get('/me', auth);

module.exports = router;
