import express from 'express';
import { getDashboardStats } from '../controller/dashboardCountController.js';

const countRoute = express.Router();

// Default route for testing
countRoute.get('/', (req, res) => {
    res.send('Count Route is working...');
});

countRoute.get('/total', getDashboardStats);

export default countRoute;