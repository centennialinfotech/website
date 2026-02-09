// imageUpload.js
const cloudinary = require('../config/cloudinaryConfig'); // Adjust path as needed

/**
 * Upload an image to Cloudinary from base64 data
 * @param {string} base64Image - The image data as a base64 encoded string
 * @param {string} folder - Optional: the folder in Cloudinary where the image will be stored
 * @returns {Promise<string>} - The URL of the uploaded image
 */
const uploadImageFromBase64 = async (base64Image, folder = 'default_folder') => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
      folder,
    });

    return result.secure_url;
  } catch (error) {
    console.error('\n❌ Error uploading base64 image to Cloudinary:');
    console.error(`   Folder: ${folder}`);
    console.error(`   Error message: ${error.message}`);
    console.error(`   Error code: ${error.http_code || error.code || 'N/A'}`);
    console.error(`   Error name: ${error.name || 'N/A'}`);
    
    if (error.http_code) {
      console.error(`   HTTP Status: ${error.http_code}`);
    }
    if (error.response) {
      console.error(`   Response: ${JSON.stringify(error.response, null, 2)}`);
    }
    if (error.stack) {
      console.error(`   Stack trace: ${error.stack}`);
    }
    console.error(`   Full error object:`, JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('');
    
    // Throw error with more details
    const errorMessage = error.message || 'Error uploading image';
    const detailedError = new Error(`Error uploading image: ${errorMessage}`);
    detailedError.originalError = error;
    detailedError.httpCode = error.http_code || error.code;
    throw detailedError;
  }
};

module.exports = uploadImageFromBase64;
