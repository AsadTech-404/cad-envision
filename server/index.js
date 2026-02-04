import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import drawingRoute from './routes/drawingRoute.js';
import orderRoute from './routes/orderRoute.js';
import blogRoute from './routes/blogRoute.js';
import countRoute from './routes/countRoute.js';

dotenv.config();
let port = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(express.json());
app.use(cors({
  origin: "https://cad-envision-client.vercel.app",
  credentials: true,
}));

app.use("/public", express.static("public"));


app.use('/api/auth', authRoute);
app.use('/api/drawings', drawingRoute);
app.use('/api/orders', orderRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/count', countRoute);

app.get("/",(req,res) => {
    res.send("WELLCOME TO CAD API");
});

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
});
