import mongoose from "mongoose"; 

const GalleryImageSchema = new mongoose.Schema(
  {
    // Display fields
    title: { type: String, trim: true, default: "" },
    caption: { type: String, trim: true, default: "" },
    alt: { type: String, trim: true, default: "" },

    // File info (URL is required; can be absolute or /uploads/… from your upload route)
    url: { type: String, required: true, trim: true },
    width: { type: Number },
    height: { type: Number },
    fileSize: { type: Number }, // bytes
    mimeType: { type: String, trim: true },

    // Optional if you later move to a cloud provider
    publicId: { type: String, trim: true, default: "" },

    // Tags for filtering (e.g., "room", "reception", "therapy")
    tags: [{ type: String, trim: true }],

    // Publishing + ordering
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },

    // Audit
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

// Helpful indexes
GalleryImageSchema.index({ isPublished: 1, order: 1, createdAt: -1 });
GalleryImageSchema.index({ tags: 1 });

export default mongoose.models.GalleryImage ||
  mongoose.model("GalleryImage", GalleryImageSchema);
