import mongoose from 'mongoose';
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter a blog title'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter blog description'],
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        'Trends',
        'Street Style',
        'Outfit Ideas',
        'Beauty',
        'Accessories',
        'Seasonal Lookbook',
      ],
    },
  },
  { timestamps: true }
);

blogSchema.pre('validate', function () {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});


export default mongoose.model('Blog', blogSchema);