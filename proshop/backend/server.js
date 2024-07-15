import express from 'express';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (_, res) => {
  res.send('API is running...');
});

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
