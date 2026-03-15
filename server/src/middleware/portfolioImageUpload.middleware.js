const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed.'));
    }
    return cb(null, true);
  },
});

const uploadPortfolioImages = upload.fields([
  { name: 'image_file', maxCount: 1 },
  { name: 'image_files', maxCount: 30 },
]);

const processPortfolioImage = async (req, res, next) => {
  try {
    const singleFile = req.files?.image_file?.[0] || null;
    const multiFiles = Array.isArray(req.files?.image_files) ? req.files.image_files : [];
    const files = [singleFile, ...multiFiles].filter(Boolean);

    if (!files.length) {
      return next();
    }

    const uploadDir = path.resolve(__dirname, '../upload/portfolio');
    fs.mkdirSync(uploadDir, { recursive: true });

    const safeBase = String(req.body?.title || 'portfolio-image')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'portfolio-image';

    const uploadedUrls = [];

    for (const [index, file] of files.entries()) {
      const filename = `${Date.now()}-${index + 1}-${safeBase}.webp`;
      const outputPath = path.join(uploadDir, filename);

      await sharp(file.buffer)
        .rotate()
        .resize({
          width: 480,
          height: 430,
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 86 })
        .toFile(outputPath);

      uploadedUrls.push(`/uploads/portfolio/${filename}`);
    }

    req.uploadedPortfolioImageUrls = uploadedUrls;
    req.uploadedPortfolioImageUrl = uploadedUrls[0] || null;
    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Unable to process uploaded image.', error: error.message });
  }
};

module.exports = {
  uploadPortfolioImages,
  processPortfolioImage,
};
