import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import orderRoutes from './routes/order.routes';
import dotenv from 'dotenv';
import './config/db';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
	origin: 'http://localhost:5000',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
}));

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

export default app;