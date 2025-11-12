const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authRequired, requireRole } = require('../middleware/authMiddleware')

router.post('/register', authController.register);
router.post('/login', authController.login);

// auth-required
router.get('/me', authRequired, authController.me);

// admin-only: list users
router.get('/', authRequired, requireRole('admin'), authController.listUsers);

module.exports = router;
