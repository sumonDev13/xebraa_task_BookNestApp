const express = require('express');
const router = express.Router();
const { register, requestMagicLink, verifyMagicLink } = require('../controllers/authController');
const { validateToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', requestMagicLink);
router.get('/verify/:token', validateToken, verifyMagicLink);

module.exports = router;