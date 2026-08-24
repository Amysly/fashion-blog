import mongoose from 'mongoose';

const inspiredLookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
   
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('InspiredLooks',inspiredLookSchema);