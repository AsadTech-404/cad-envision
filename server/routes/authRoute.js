import express from 'express'
import { login, register } from '../controller/authController.js';

const authRoute = express.Router();
// Default route for testing
authRoute.get('/', (req, res) => {
    res.send('Auth Route is working...');
});

// User authentication routes
authRoute.post('/register', register);
authRoute.post("/login", login);



export default authRoute;