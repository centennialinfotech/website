const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
const path = require('path');

/**
 * Upload all files from a directory to Cloudinary
 * @param {string} dir - The local directory path to upload
 * @param {string} cloudFolder - The folder name in Cloudinary (default: 'img')
 * @returns {Promise<Array>} - Array of uploaded file results
 */
async function uploadDir(dir, cloudFolder = 'img') {
  const results = [];
  const files = fs.readdirSync(dir);
  
  // Filter and count only image files (excluding directories)
  const imageFiles = files.filter(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) return false;
    const ext = path.parse(file).ext.toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    return imageExtensions.includes(ext);
  });

  const isSingleFile = imageFiles.length === 1;
  let currentFileIndex = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively upload subdirectories
      const subResults = await uploadDir(fullPath, `${cloudFolder}/${file}`);
      results.push(...subResults);
    } else {
      // Upload file
      const name = path.parse(file).name;
      const ext = path.parse(file).ext.toLowerCase();

      // Only upload image files
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
      if (!imageExtensions.includes(ext)) {
        console.log(`Skipping non-image file: ${cloudFolder}/${file}`);
        continue;
      }

      currentFileIndex++;
      
      // Validate file exists and is readable before attempting upload
      if (!fs.existsSync(fullPath)) {
        console.error(`\n❌ File not found: ${fullPath}`);
        results.push({
          file: `${cloudFolder}/${file}`,
          error: 'File not found',
          errorCode: 'FILE_NOT_FOUND',
          errorName: 'FileNotFoundError',
        });
        continue;
      }

      // Check file stats and verify file is readable
      let fileStats;
      try {
        fileStats = fs.statSync(fullPath);
        if (!fileStats.isFile()) {
          console.error(`\n❌ Path is not a file: ${fullPath}`);
          results.push({
            file: `${cloudFolder}/${file}`,
            error: 'Path is not a file',
            errorCode: 'NOT_A_FILE',
            errorName: 'NotAFileError',
          });
          continue;
        }
        if (fileStats.size === 0) {
          console.error(`\n❌ File is empty: ${fullPath}`);
          results.push({
            file: `${cloudFolder}/${file}`,
            error: 'File is empty',
            errorCode: 'EMPTY_FILE',
            errorName: 'EmptyFileError',
          });
          continue;
        }
        
        // Try to read a small portion of the file to verify it's accessible
        try {
          const fileHandle = fs.openSync(fullPath, 'r');
          fs.closeSync(fileHandle);
        } catch (readError) {
          console.error(`\n❌ Cannot read file: ${fullPath}`);
          console.error(`   Error: ${readError.message}`);
          results.push({
            file: `${cloudFolder}/${file}`,
            error: `Cannot read file: ${readError.message}`,
            errorCode: 'FILE_READ_ERROR',
            errorName: readError.name || 'FileReadError',
          });
          continue;
        }
      } catch (statError) {
        console.error(`\n❌ Error accessing file: ${fullPath}`);
        console.error(`   Error: ${statError.message}`);
        results.push({
          file: `${cloudFolder}/${file}`,
          error: `Cannot access file: ${statError.message}`,
          errorCode: 'FILE_ACCESS_ERROR',
          errorName: statError.name || 'FileAccessError',
        });
        continue;
      }

      // Retry logic for uploads
      let uploadSuccess = false;
      let lastError = null;
      const maxRetries = 3;
      const retryDelay = 3000; // 3 seconds (increased for timeout issues)

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          // Use folder parameter and filename only in public_id to avoid Cloudinary auto-prefixing
          // This prevents creating nested directories like "Cloudinary_img/img/filename"
          
          // Construct public_id with folder path
          const publicIdWithFolder = `${cloudFolder}/${name}`;
          
          // Log upload info with single/multiple file context
          if (isSingleFile) {
            console.log(`📤 Uploading single file: ${cloudFolder}/${file} (Attempt ${attempt}/${maxRetries})`);
            console.log(`   Public ID: ${publicIdWithFolder}`);
            console.log(`   File size: ${(fileStats.size / 1024).toFixed(2)} KB`);
            console.log(`   Overwrite: enabled (will replace if exists)`);
          } else {
            console.log(`📤 Uploading ${cloudFolder}/${file} (${currentFileIndex}/${imageFiles.length}) - Attempt ${attempt}/${maxRetries}`);
            console.log(`   Public ID: ${publicIdWithFolder}`);
            console.log(`   File size: ${(fileStats.size / 1024).toFixed(2)} KB`);
            console.log(`   Overwrite: enabled (will replace if exists)`);
          }

          // Upload with explicit overwrite settings
          // Use absolute path to avoid any path resolution issues
          const absolutePath = path.resolve(fullPath);
          
          // Calculate timeout based on file size
          // Base timeout: 3 minutes (180 seconds)
          // Add 2 seconds per MB for larger files
          // Maximum: 10 minutes (600 seconds)
          const fileSizeMB = fileStats.size / (1024 * 1024);
          const baseTimeout = 180000; // 3 minutes base
          const perMBTimeout = Math.ceil(fileSizeMB * 2000); // 2 seconds per MB
          const calculatedTimeout = baseTimeout + perMBTimeout;
          const uploadTimeout = Math.min(calculatedTimeout, 600000); // Max 10 minutes
          
          console.log(`   Timeout: ${(uploadTimeout / 1000).toFixed(0)} seconds (file size: ${fileSizeMB.toFixed(2)} MB)`);
          
          // Use buffer-based upload for better connection stability and reliability
          // This helps avoid socket connection timeout issues
          const fileBuffer = fs.readFileSync(absolutePath);
          console.log(`   Using buffer-based upload (${(fileBuffer.length / 1024).toFixed(2)} KB buffer)`);
          
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
              public_id: publicIdWithFolder, // Include folder in public_id (e.g., "img/filename")
              overwrite: true, // Explicitly overwrite existing files
              unique_filename: false, // Use the provided public_id exactly
              use_filename: false, // Don't use filename since we control public_id
              timeout: uploadTimeout, // Dynamic timeout based on file size
              chunk_size: 6000000, // 6MB chunks for better reliability
              invalidate: true, // Force cache refresh
              resource_type: 'image', // Explicitly set resource type
              eager: [], // Don't generate transformations during upload
              eager_async: false,
            }, (error, uploadResult) => {
              if (error) {
                reject(error);
              } else {
                resolve(uploadResult);
              }
            });
            
            // Write buffer to stream
            uploadStream.end(fileBuffer);
          });

          // Log successful upload
          console.log(`✅ Successfully uploaded: ${cloudFolder}/${file}`);
          console.log(`   Cloudinary public_id: ${result.public_id}`);
          console.log(`   Expected location: ${cloudFolder}/${name}`);
          console.log(`   Format: ${result.format}, Size: ${(result.bytes / 1024).toFixed(2)} KB`);
          console.log(`   URL: ${result.secure_url}`);
          
          // Verify the folder structure is correct
          const publicIdParts = result.public_id.split('/');
          if (publicIdParts.length > 1) {
            const actualFolder = publicIdParts.slice(0, -1).join('/');
            if (actualFolder !== cloudFolder) {
              console.log(`   ⚠️  Warning: Expected folder "${cloudFolder}" but got "${actualFolder}"`);
            } else {
              console.log(`   ✓ Folder structure correct: ${actualFolder}`);
            }
          }
          
          if (result.existing) {
            console.log(`   ℹ️  File was overwritten (existed previously)`);
          }
          console.log('');

          // Use the actual public_id from Cloudinary (includes correct folder path)
          // Generate URL without version number using the actual public_id
          const urlWithoutVersion = cloudinary.url(result.public_id, {
            secure: true,
            format: result.format,
          });

          results.push({
            file: `${cloudFolder}/${file}`,
            url: urlWithoutVersion,
            public_id: result.public_id, // This contains the actual folder path Cloudinary created
            original_url: result.secure_url, // Keep original URL with version for reference
            overwritten: result.existing || false, // Indicate if file was overwritten
            format: result.format,
            size: result.bytes,
          });
          uploadSuccess = true;
          break; // Success, exit retry loop
        } catch (error) {
          lastError = error;
          
          // Extract error details more comprehensively
          const errorMessage = error.message || error.error?.message || String(error) || 'Unknown error';
          const errorCode = error.http_code || error.code || error.error?.code || 'N/A';
          const errorName = error.name || error.error?.name || error.constructor?.name || 'Error';
          const httpCode = error.http_code || error.status || error.statusCode;
          
          // Check for timeout/connection errors (including ERR_SOCKET_CONNECTION_TIMEOUT)
          const isTimeoutError = errorMessage.toLowerCase().includes('timeout') || 
                                 errorMessage.toLowerCase().includes('socket') ||
                                 errorMessage.toLowerCase().includes('connection') ||
                                 errorMessage.includes('ERR_SOCKET_CONNECTION_TIMEOUT') ||
                                 errorCode === 'ETIMEDOUT' ||
                                 errorCode === 'ECONNRESET' ||
                                 errorCode === 'ENOTFOUND' ||
                                 errorCode === 'ERR_SOCKET_CONNECTION_TIMEOUT' ||
                                 errorName === 'TimeoutError';
          
          // Log detailed error information
          console.error(`\n❌ Error uploading ${cloudFolder}/${file} (Attempt ${attempt}/${maxRetries})`);
          console.error(`   File path: ${fullPath}`);
          console.error(`   File size: ${fileStats ? (fileStats.size / 1024).toFixed(2) + ' KB' : 'Unknown'}`);
          console.error(`   Error message: ${errorMessage}`);
          console.error(`   Error code: ${errorCode}`);
          console.error(`   Error name: ${errorName}`);
          
          if (isTimeoutError) {
            console.error(`   ⚠️  TIMEOUT/CONNECTION ERROR DETECTED`);
            console.error(`   This may be due to:`);
            console.error(`   - Large file size (${fileStats ? (fileStats.size / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown'})`);
            console.error(`   - Slow network connection`);
            console.error(`   - Cloudinary server issues`);
            console.error(`   - Firewall/proxy blocking the connection`);
            if (attempt < maxRetries) {
              console.error(`   Will retry with longer timeout...`);
            }
          }
          
          // Log Cloudinary-specific error details if available
          if (httpCode) {
            console.error(`   HTTP Status: ${httpCode}`);
          }
          if (error.response) {
            console.error(`   Response: ${JSON.stringify(error.response, null, 2)}`);
          }
          if (error.error) {
            console.error(`   Error details: ${JSON.stringify(error.error, null, 2)}`);
          }
          if (error.stack) {
            console.error(`   Stack trace: ${error.stack}`);
          }
          
          // Try to get all error properties
          const errorKeys = Object.keys(error);
          if (errorKeys.length > 0) {
            console.error(`   Error properties: ${errorKeys.join(', ')}`);
            const errorObj = {};
            errorKeys.forEach(key => {
              try {
                errorObj[key] = error[key];
              } catch (e) {
                errorObj[key] = '[Cannot serialize]';
              }
            });
            console.error(`   Full error object:`, JSON.stringify(errorObj, null, 2));
          } else {
            console.error(`   Full error object:`, error);
          }
          console.error('');
          
          // If it's a timeout error and not the last attempt, wait longer before retrying
          // For socket connection timeouts, wait even longer (5 seconds)
          const isSocketTimeout = errorMessage.includes('ERR_SOCKET_CONNECTION_TIMEOUT') || 
                                  errorCode === 'ERR_SOCKET_CONNECTION_TIMEOUT';
          const retryWaitTime = isSocketTimeout 
            ? 5000  // 5 seconds for socket timeouts
            : isTimeoutError 
              ? retryDelay * 2  // 6 seconds for other timeouts
              : retryDelay;     // 3 seconds for other errors
          
          // If it's not the last attempt, wait before retrying
          if (attempt < maxRetries) {
            console.log(`⏳ Retrying in ${(retryWaitTime / 1000).toFixed(0)} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryWaitTime));
          }
        }
      }

      // If all retries failed, add detailed error to results
      if (!uploadSuccess) {
        const errorMessage = lastError 
          ? (lastError.message || lastError.error?.message || String(lastError) || 'Upload failed after retries')
          : 'Upload failed after retries';
        const errorCode = lastError 
          ? (lastError.http_code || lastError.code || lastError.error?.code || 'UNKNOWN_ERROR')
          : 'UNKNOWN_ERROR';
        const errorName = lastError 
          ? (lastError.name || lastError.error?.name || lastError.constructor?.name || 'UnknownError')
          : 'UnknownError';
        const httpCode = lastError 
          ? (lastError.http_code || lastError.status || lastError.statusCode || null)
          : null;
        
        // Check if it's a timeout error
        const isTimeoutError = errorMessage.toLowerCase().includes('timeout') || 
                               errorMessage.toLowerCase().includes('socket') ||
                               errorMessage.toLowerCase().includes('connection') ||
                               errorCode === 'ETIMEDOUT' ||
                               errorCode === 'ECONNRESET' ||
                               errorCode === 'ENOTFOUND';
        
        const errorDetails = {
          file: `${cloudFolder}/${file}`,
          error: errorMessage,
          errorCode: errorCode,
          errorName: errorName,
          httpCode: httpCode,
          attempts: maxRetries,
          isTimeoutError: isTimeoutError,
          fileSize: fileStats ? fileStats.size : null,
          fileSizeMB: fileStats ? (fileStats.size / (1024 * 1024)).toFixed(2) : null,
        };
        
        // Include full error details if available
        if (lastError) {
          if (lastError.response) {
            errorDetails.response = lastError.response;
          }
          if (lastError.error) {
            errorDetails.errorDetails = lastError.error;
          }
          // Include any other relevant error properties
          if (lastError.status) errorDetails.status = lastError.status;
          if (lastError.statusCode) errorDetails.statusCode = lastError.statusCode;
        }
        
        if (isTimeoutError) {
          errorDetails.suggestion = 'This appears to be a timeout/connection error. Try: 1) Check your internet connection, 2) Reduce file size, 3) Check firewall/proxy settings, 4) Try again later';
        }
        
        console.error(`\n🚫 Final failure for ${cloudFolder}/${file} after ${maxRetries} attempts`);
        console.error(`   Error details:`, JSON.stringify(errorDetails, null, 2));
        console.error('');
        
        results.push(errorDetails);
      }
    }
  }

  return results;
}

/**
 * Controller function to handle directory upload endpoint
 */
exports.uploadDirectory = async (req, res) => {
  try {
    const { folderPath, cloudFolder } = req.body;

    // Default to public/img if no folder path provided
    const LOCAL_DIR = folderPath 
      ? path.resolve(folderPath)
      : path.join(__dirname, '../../frontend/public/img');

    // Check if directory exists
    if (!fs.existsSync(LOCAL_DIR)) {
      return res.status(400).json({
        success: false,
        message: `Directory not found: ${LOCAL_DIR}`,
      });
    }

    // Check if it's a directory
    if (!fs.statSync(LOCAL_DIR).isDirectory()) {
      return res.status(400).json({
        success: false,
        message: `Path is not a directory: ${LOCAL_DIR}`,
      });
    }

    const cloudFolderName = cloudFolder || 'img';
    
    // Check if directory has any files
    const files = fs.readdirSync(LOCAL_DIR);
    if (files.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Directory is empty: ${LOCAL_DIR}`,
      });
    }

    // Count only image files (excluding directories)
    const imageFiles = files.filter(file => {
      const fullPath = path.join(LOCAL_DIR, file);
      if (fs.statSync(fullPath).isDirectory()) return false;
      const ext = path.parse(file).ext.toLowerCase();
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
      return imageExtensions.includes(ext);
    });

    if (imageFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: `No image files found in directory: ${LOCAL_DIR}`,
        total: files.length,
      });
    }

    const fileCount = imageFiles.length;
    const fileWord = fileCount === 1 ? 'file' : 'files';
    console.log(`\n🚀 Starting upload from ${LOCAL_DIR} to Cloudinary folder: ${cloudFolderName}`);
    console.log(`   Found ${fileCount} image ${fileWord} to upload`);
    console.log(`   Overwrite mode: enabled (existing files will be replaced)`);
    console.log(`   Upload method: Buffer-based (more reliable for connection issues)`);
    console.log(`   Cloudinary cloud: ${cloudinary.config().cloud_name}`);
    console.log('');

    const results = await uploadDir(LOCAL_DIR, cloudFolderName);

    const successful = results.filter(r => r.url).length;
    const failed = results.filter(r => r.error).length;
    const overwritten = results.filter(r => r.overwritten).length;

    console.log(`\n📊 Upload Summary:`);
    console.log(`   Total files processed: ${results.length}`);
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ❌ Failed: ${failed}`);
    if (overwritten > 0) {
      console.log(`   🔄 Overwritten: ${overwritten}`);
    }
    console.log('');

    res.status(200).json({
      success: true,
      message: `Upload completed: ${successful} successful, ${failed} failed${overwritten > 0 ? `, ${overwritten} overwritten` : ''}`,
      total: results.length,
      successful,
      failed,
      overwritten,
      results,
    });
  } catch (error) {
    console.error('\n❌ Error in uploadDirectory controller:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Code: ${error.code || 'N/A'}`);
    console.error(`   Name: ${error.name || 'N/A'}`);
    if (error.stack) {
      console.error(`   Stack trace: ${error.stack}`);
    }
    console.error(`   Full error:`, JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('');
    
    res.status(500).json({
      success: false,
      message: 'Error uploading directory',
      error: error.message,
      errorCode: error.code || error.http_code || 'UNKNOWN_ERROR',
      errorName: error.name || 'Error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
