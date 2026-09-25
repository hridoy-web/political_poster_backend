import { Router } from 'express';
import { uploadImages } from '../controllers/upload.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const uploadRouter = Router();

uploadRouter.post('/images', upload.array('photos', 3), uploadImages);

export default uploadRouter;