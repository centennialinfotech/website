const express = require('express');
const router = express.Router();
const { login, getAdmins, createAdmin } = require("../controller/adminController");

// Public route
router.post('/login', login);

// Protected routes (you can add auth middleware later)
router.get('/admins', getAdmins);
router.post('/admins', createAdmin);

module.exports = router;