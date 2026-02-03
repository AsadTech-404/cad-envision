import express from 'express';
import { addDrawing, getDrawings, deleteDrawing, updateDrawing, getDrawingById} from '../controller/drawingController.js';
import upload from '../middleware/multer.js';

const drawingRoute = express.Router();

// Default route for testing
drawingRoute.get('/', (req, res) => {
    res.send('Drawing Route is working...');
});


drawingRoute.post('/add', upload.single('image'),addDrawing);
drawingRoute.put('/update/:id', upload.single('image'), updateDrawing);
drawingRoute.get('/all', getDrawings);
drawingRoute.get('/single/:id', getDrawingById);
drawingRoute.delete('/delete/:id', deleteDrawing);

export default drawingRoute;