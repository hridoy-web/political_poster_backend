import { Router } from 'express';
import { getAllTemplates, getTemplateById } from '../controllers/template.controller.js';

const templateRouter = Router();

templateRouter.route('/').get(getAllTemplates);
templateRouter.route('/:id').get(getTemplateById);

export default templateRouter;