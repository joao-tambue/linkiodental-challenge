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

try {
	const swaggerUi = require('swagger-ui-express');
	const YAML = require('yamljs');
	const path = require('path');
	const openapiPath = path.join(__dirname, 'docs', 'openapi.yml');
	const swaggerDocument = YAML.load(openapiPath);
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
	console.warn('Swagger UI não está disponível. Rode `npm install swagger-ui-express yamljs` para habilitar.');
}

export default app;