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

const uploadFooterGalleryImages = upload.fields([
  { name: 'image_file', maxCount: 1 },
  { name: 'image_files', maxCount: 16 },
]);

const processFooterGalleryImages = async (req, res, next) => {
  try {
    const singleFile = req.files?.image_file?.[0] || null;
    const multiFiles = Array.isArray(req.files?.image_files) ? req.files.image_files : [];
    const files = [singleFile, ...multiFiles].filter(Boolean);

    if (!files.length) {
      return next();
    }

    const uploadDir = path.resolve(__dirname, '../upload/footer-gallery');
    fs.mkdirSync(uploadDir, { recursive: true });

    const safeBase = String(req.body?.title || 'footer-gallery')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'footer-gallery';

    const uploadedAssets = [];

    for (const [index, file] of files.entries()) {
      const timestamp = Date.now() + index;
      const baseName = `${timestamp}-${index + 1}-${safeBase}`;
      const imageFilename = `${baseName}.webp`;
      const thumbFilename = `${baseName}-thumb.webp`;

      const imageOutputPath = path.join(uploadDir, imageFilename);
      const thumbOutputPath = path.join(uploadDir, thumbFilename);

      await sharp(file.buffer)
        .rotate()
        .resize({
          width: 1400,
          height: 1400,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 88 })
        .toFile(imageOutputPath);

      await sharp(file.buffer)
        .rotate()
        .resize({
          width: 420,
          height: 420,
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 82 })
        .toFile(thumbOutputPath);

      uploadedAssets.push({
        image_url: `/uploads/footer-gallery/${imageFilename}`,
        thumbnail_url: `/uploads/footer-gallery/${thumbFilename}`,
      });
    }

    req.uploadedFooterGalleryAssets = uploadedAssets;
    req.uploadedFooterGalleryAsset = uploadedAssets[0] || null;
    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Unable to process uploaded footer image.', error: error.message });
  }
};

module.exports = {
  uploadFooterGalleryImages,
  processFooterGalleryImages,
};
