const express = require('express');
const router = express.Router();
const { uploadDirectory } = require('../controller/uploadController');
const cloudinary = require('../config/cloudinaryConfig');

// Test endpoint to verify Cloudinary connection
router.get('/test-cloudinary', async (req, res) => {
  try {
    // Test connection by getting account details
    const result = await cloudinary.api.ping();
    res.json({
      success: true,
      message: 'Cloudinary connection successful',
      cloudName: cloudinary.config().cloud_name,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cloudinary connection failed',
      error: error.message,
      cloudName: cloudinary.config().cloud_name
    });
  }
});

router.post('/upload-directory', uploadDirectory);

module.exports = router;
