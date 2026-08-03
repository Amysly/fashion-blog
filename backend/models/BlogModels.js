import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId ,  
      ref:'User',
      required:true
    },
  
  title: {
    type: String, 
    required: [true, 'Please enter a blog title'],
  },
  description: {
    type: String,
    required: [true, 'Please enter blog description'],
  },
 /* image: {
    type: String, 
  },*/
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
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);