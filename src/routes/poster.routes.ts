import { Router } from 'express';
import {
    createPoster,
    getUserPosters,
    regeneratePoster,
    deletePoster
} from '../controllers/poster.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const posterRouter = Router();

posterRouter.post('/', verifyJWT, upload.array('images', 3), createPoster);
posterRouter.get('/user/history', verifyJWT, getUserPosters);
posterRouter.post('/:id/regenerate', verifyJWT, regeneratePoster);
posterRouter.delete('/:id', verifyJWT, deletePoster);

export default posterRouter;