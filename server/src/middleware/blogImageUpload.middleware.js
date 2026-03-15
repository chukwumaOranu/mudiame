const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed.'));
    }
    return cb(null, true);
  },
});

const uploadFeaturedImage = upload.single('featured_image_file');

const processFeaturedImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const uploadDir = path.resolve(__dirname, '../upload/blog');
    fs.mkdirSync(uploadDir, { recursive: true });

    const safeBase = String(req.body?.title || 'blog-image')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'blog-image';

    const filename = `${Date.now()}-${safeBase}.webp`;
    const outputPath = path.join(uploadDir, filename);

    await sharp(req.file.buffer)
      .rotate()
      .resize({
        width: 1000,
        height: 600,
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 84 })
      .toFile(outputPath);

    req.uploadedFeaturedImageUrl = `/uploads/blog/${filename}`;
    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Unable to process uploaded image.', error: error.message });
  }
};

module.exports = {
  uploadFeaturedImage,
  processFeaturedImage,
};
