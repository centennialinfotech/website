const express = require('express');
const router = express.Router();
const { contactUs } = require('../controller/ContactController');

router.post('/contact-us', contactUs);

module.exports = router;
