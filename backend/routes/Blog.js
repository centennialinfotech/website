const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createBlog, getBlogs, uploadImage } = require('../controller/BlogController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/blogs', createBlog);

router.get('/getBlog', getBlogs);

router.post('/image', upload.single('image'), uploadImage);

module.exports = router;
