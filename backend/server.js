import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleWare.js';
import blogRoutes from './routes/blogRoute.js';
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import emailSub from './routes/emailSubRoute.js'
import trendingOutfitRoute from './routes/trendingOutfitRoute.js'
import contactMessageRoute from './routes/contactMessageRoute.js'

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/blog/', blogRoutes);
app.use('/api/auth/', authRoute); 
app.use('/api/products/', productRoute); 
app.use('/api/subscribe', emailSub); 
app.use('/api/trending-outfit/', trendingOutfitRoute ); 
app.use('/api/contact', contactMessageRoute); 

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});