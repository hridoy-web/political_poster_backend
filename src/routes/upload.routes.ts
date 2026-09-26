import { Router } from 'express';
import { uploadImages } from '../controllers/upload.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const uploadRouter = Router();

uploadRouter.post('/images', verifyJWT, upload.array('photos', 3), uploadImages);

export default uploadRouter;