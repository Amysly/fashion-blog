import mongoose from "mongoose";
import crypto from 'node:crypto';

const emailSubcriptionSchema = new mongoose.Schema(
    
  {
    user:{
         type:mongoose.Schema.Types.ObjectId ,  
         ref:'User',
            },
    
    email: {
      type: String,
      required: true,
      trim: true,
    lowercase: true,
      unique:true
    },
    unsubscribeToken: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(20).toString('hex'),
    },
   
  },
  {
    timestamps: true,
  }
);

const emailSub = mongoose.model('EmailSub', emailSubcriptionSchema);

export default emailSub;