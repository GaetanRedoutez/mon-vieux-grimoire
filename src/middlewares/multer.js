const multer = require('multer')

// Map of MIME types to file extensions
const MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/webp': 'webp'
}

// Function to sanitize the filename by replacing non-alphanumeric characters with underscores
const sanitizeName = (filename) => {
  return filename.replace(/[^a-zA-Z0-9]/g, '_')
}

const storage = multer.diskStorage({
  // Set the destination directory for storing uploaded images
  destination: function (req, file, callback) {
    callback(null, 'public/temp')
  },
  filename: function (req, file, callback) {
    const prefix = Date.now()
    const name = file.originalname.split(' ').join('_')
    const formatName = name.split('.')[0]
    const sanitizedName = sanitizeName(formatName)

    const extension = MIME_TYPES[file.mimetype]
    const isRename = prefix + '_' + sanitizedName + '.' + extension

    callback(null, isRename)
  }
})

/**
 * Multer middleware configuration with single-file upload support
 */
module.exports = multer({ storage }).single('image')
