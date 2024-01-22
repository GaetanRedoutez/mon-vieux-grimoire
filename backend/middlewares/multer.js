const multer = require('multer');

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
};

const sanitizeName = (filename) => {
  return filename.replace(/[^a-zA-Z0-9]/g, '_');
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'images');
  },
  filename: function (req, file, callback) {
    const name = file.originalname.split(' ').join('_');
    const formatName = name.split('.')[0];
    const sanitizedName = sanitizeName(formatName);

    const extension = MIME_TYPES[file.mimetype];

    callback(null, Date.now() + '_' + sanitizedName + '.' + extension);
  },
});

module.exports = multer({ storage }).single('image');

//TODO Commenter le fichier
