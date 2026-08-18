import mongoose from "mongoose";

const ContactMsgSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required: true,
      trim:true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    lowercase: true,
      unique:true
    },
    subject: {
      type: String,
      enum: ['Brand Collaboration and Sponsorship', 'General Inquiry'],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const contactMessage = mongoose.model('ContactMsg', ContactMsgSchema);

export default contactMessage;