import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleWare.js';
import blogRoutes from './routes/blogRoute.js';
import authRoute from './routes/authRoute.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/blog/', blogRoutes);
app.use('/api/auth/', authRoute); 

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});