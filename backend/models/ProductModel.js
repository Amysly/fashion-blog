import mongoose from "mongoose";
import slugify from "slugify";


const productSchema = new mongoose.Schema(
    
  {
     user:{
          type:mongoose.Schema.Types.ObjectId ,  
          ref:'User',
          required:true
        },

      description: {type:String,
        required:true,
        trim:true
      },
        
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    slug: { 
    type: String, 
    unique: true, 
    lowercase: true 
  }
  },
  {
    timestamps: true,
  }
  
);

productSchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;