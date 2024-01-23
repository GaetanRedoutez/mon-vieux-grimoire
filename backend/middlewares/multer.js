const multer = require('multer');

// Map of MIME types to file extensions
const MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
};

// Function to sanitize the filename by replacing non-alphanumeric characters with underscores
const sanitizeName = (filename) => {
  return filename.replace(/[^a-zA-Z0-9]/g, '_');
};

// Multer disk storage configuration
const storage = multer.diskStorage({
  // Set the destination directory for storing uploaded images
  destination: function (req, file, callback) {
    callback(null, 'images');
  },
  filename: function (req, file, callback) {
    // Extract and sanitize the original filename
    const name = file.originalname.split(' ').join('_');
    const formatName = name.split('.')[0];
    const sanitizedName = sanitizeName(formatName);

    // Get the file extension based on the MIME type
    const extension = MIME_TYPES[file.mimetype];

    // Construct the final filename with a timestamp, sanitized name, and extension
    callback(null, Date.now() + '_' + sanitizedName + '.' + extension);
  },
});

/**
 * Multer middleware configuration with single-file upload support
 */
module.exports = multer({ storage }).single('image');
