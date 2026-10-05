import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter a Hero Section title'],
      trim: true,
    },
    image: {
      type: String,
    }
}, 
  
  { timestamps: true }
);




export default mongoose.model('HeroSection', heroSectionSchema);