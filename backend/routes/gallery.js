import express from "express";
const router = express.Router();

import GalleryImage from "../models/GalleryImage.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

/**
 * Public: List published gallery images (grid)
 * GET /api/gallery
 * Query: page, limit, tag (optional)
 */
router.get("/", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "30", 10), 1), 100);

    const filter = { isPublished: true };
    if (req.query.tag) {
      filter.tags = { $in: [req.query.tag] };
    }

    const [items, total] = await Promise.all([
      GalleryImage.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      GalleryImage.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET /gallery error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch gallery images." });
  }
});

/**
 * ✅ Public (explicit): same as "/", but lives at /api/gallery/public
 * Useful to avoid any accidental admin/proxy mix-ups on the frontend.
 */
router.get("/public", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "30", 10), 1), 100);

    const filter = { isPublished: true };
    if (req.query.tag) {
      filter.tags = { $in: [req.query.tag] };
    }

    const [items, total] = await Promise.all([
      GalleryImage.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      GalleryImage.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET /gallery/public error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch public gallery images." });
  }
});

/**
 * Admin: List all images (published + drafts)
 * GET /api/gallery/admin
 * Query: page, limit, search, tag
 */
router.get("/admin", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "30", 10), 1), 100);

    const filter = {};
    if (req.query.tag) filter.tags = { $in: [req.query.tag] };
    if (req.query.search) {
      const rx = new RegExp(req.query.search.trim(), "i");
      filter.$or = [{ title: rx }, { caption: rx }, { alt: rx }];
    }

    const [items, total] = await Promise.all([
      GalleryImage.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      GalleryImage.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET /gallery/admin error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch gallery images (admin)." });
  }
});

/**
 * Admin: Create a new gallery image
 * POST /api/gallery
 */
router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const {
      url,
      title = "",
      caption = "",
      alt = "",
      tags = [],
      isPublished = true,
      order,
      width,
      height,
      fileSize,
      mimeType,
      publicId = "",
    } = req.body || {};

    if (!url || typeof url !== "string") {
      return res.status(400).json({ success: false, message: "Field 'url' is required." });
    }

    const normTags =
      Array.isArray(tags) ? tags.map((t) => String(t).trim()).filter(Boolean) : [];

    let finalOrder = typeof order === "number" ? order : 0;
    if (order === undefined) {
      const max = await GalleryImage.findOne().sort({ order: -1 }).select("order").lean();
      finalOrder = max ? max.order + 1 : 0;
    }

    const doc = await GalleryImage.create({
      url: url.trim(),
      title: String(title || "").trim(),
      caption: String(caption || "").trim(),
      alt: String(alt || "").trim(),
      tags: normTags,
      isPublished: !!isPublished,
      order: finalOrder,
      width,
      height,
      fileSize,
      mimeType,
      publicId: String(publicId || "").trim(),
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    });

    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    console.error("POST /gallery error:", err);
    return res.status(500).json({ success: false, message: "Failed to create gallery image." });
  }
});

/**
 * Admin: Update an image
 * PATCH /api/gallery/:id
 */
router.patch("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const updates = {};
    const allowed = [
      "title",
      "caption",
      "alt",
      "url",
      "tags",
      "isPublished",
      "order",
      "width",
      "height",
      "fileSize",
      "mimeType",
      "publicId",
    ];

    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updates[key] = req.body[key];
      }
    }

    if (updates.tags) {
      updates.tags = Array.isArray(updates.tags)
        ? updates.tags.map((t) => String(t).trim()).filter(Boolean)
        : [];
    }

    updates.updatedBy = req.user?._id;

    const doc = await GalleryImage.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).json({ success: false, message: "Image not found." });
    }

    return res.json({ success: true, data: doc });
  } catch (err) {
    console.error("PATCH /gallery/:id error:", err);
    return res.status(500).json({ success: false, message: "Failed to update gallery image." });
  }
});

/**
 * Admin: Delete an image
 * DELETE /api/gallery/:id
 */
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const doc = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Image not found." });
    }
    return res.json({ success: true, message: "Image deleted." });
  } catch (err) {
    console.error("DELETE /gallery/:id error:", err);
    return res.status(500).json({ success: false, message: "Failed to delete gallery image." });
  }
});

/**
 * Admin: Bulk reorder
 * PATCH /api/gallery/reorder
 * Body: { items: [{ id, order }, ...] }
 */
router.patch("/reorder", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (!items.length) {
      return res.status(400).json({ success: false, message: "No items provided." });
    }

    const ops = items.map((it) => ({
      updateOne: {
        filter: { _id: it.id },
        update: { $set: { order: it.order, updatedBy: req.user?._id } },
      },
    }));

    await GalleryImage.bulkWrite(ops, { ordered: false });
    return res.json({ success: true, message: "Reordered successfully." });
  } catch (err) {
    console.error("PATCH /gallery/reorder error:", err);
    return res.status(500).json({ success: false, message: "Failed to reorder gallery images." });
  }
});

export default router;
