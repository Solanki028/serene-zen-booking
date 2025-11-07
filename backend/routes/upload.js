import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// ---- Multer config ----
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file && file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      const err = new Error('Only image files are allowed')
      // @ts-ignore add a code so we can map to 415 below
      err.code = 'UNSUPPORTED_MEDIA_TYPE'
      cb(err)
    }
  },
})

// Utility: upload a buffer to Cloudinary
function uploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'Velora-thai-spa',
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
          { quality: 'auto' },
        ],
        ...options,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    uploadStream.end(buffer)
  })
}

// ---- Routes ----

// Single image (accepts field name 'image' OR 'file')
router.post(
  '/image',
  authenticateToken,
  requireAdmin,
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]),
  async (req, res, next) => {
    try {
      const file =
        (req.files?.image && req.files.image[0]) ||
        (req.files?.file && req.files.file[0]) ||
        null

      if (!file) {
        return res.status(400).json({ message: 'No image file provided' })
      }

      const result = await uploadToCloudinary(file.buffer)
      // Return a normalized top-level { url } for easier frontend usage
      return res.json({
        url: result.secure_url,
        // keep extra data for admin/insight UIs
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        },
      })
    } catch (err) {
      return next(err)
    }
  }
)

// Multiple images (accepts field name 'images' OR 'files')
router.post(
  '/images',
  authenticateToken,
  requireAdmin,
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'files', maxCount: 10 }]),
  async (req, res, next) => {
    try {
      const list = [
        ...(req.files?.images || []),
        ...(req.files?.files || []),
      ]

      if (!list.length) {
        return res.status(400).json({ message: 'No image files provided' })
      }

      const results = await Promise.all(list.map((f) => uploadToCloudinary(f.buffer)))

      const images = results.map((r) => ({
        url: r.secure_url,
        publicId: r.public_id,
        width: r.width,
        height: r.height,
      }))

      return res.json({
        success: true,
        message: `${images.length} images uploaded successfully`,
        images, // normalized key for multi-upload
        data: images, // keep old key for compatibility
      })
    } catch (err) {
      return next(err)
    }
  }
)

// Delete image
router.delete(
  '/image/:publicId',
  authenticateToken,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { publicId } = req.params
      await cloudinary.uploader.destroy(publicId)
      return res.json({ success: true, message: 'Image deleted successfully' })
    } catch (err) {
      return next(err)
    }
  }
)

// ---- Centralized error handler for this router (handles Multer & others) ----
router.use((err, req, res, next) => {
  // Multer-specific errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'Image too large (max 5MB)' })
    }
    return res.status(400).json({ message: `Upload error: ${err.code}` })
  }

  // Our custom MIME error
  if (err && err.code === 'UNSUPPORTED_MEDIA_TYPE') {
    return res.status(415).json({ message: 'Unsupported media type' })
  }

  // Cloudinary / generic errors
  console.error('Upload route error:', err)
  const status = err?.status || 500
  const message =
    err?.message || 'Failed to process image. Please try again later.'
  return res.status(status).json({ message })
})

export default router
