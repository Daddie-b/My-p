// backend/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Check file type
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // Limit to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

module.exports = upload;
