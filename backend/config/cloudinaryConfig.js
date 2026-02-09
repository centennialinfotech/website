// cloudinaryConfig.js
require('dotenv').config(); // Load environment variables
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: process.env.CLOUDINARY_SECURE !== 'false', // Use HTTPS by default
  timeout: parseInt(process.env.CLOUDINARY_TIMEOUT) || 600000, // 600 seconds (10 minutes) - increased to prevent socket timeouts
  api_proxy: process.env.CLOUDINARY_API_PROXY || undefined, // Optional proxy
});

// Validate required configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn('⚠️  Warning: Cloudinary credentials not found in environment variables. Using fallback values.');
  console.warn('   Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file');
}

module.exports = cloudinary;
