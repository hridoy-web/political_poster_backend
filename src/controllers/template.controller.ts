import { Request, Response } from 'express';
import { Template } from '../models/Template.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// Get all active templates
const getAllTemplates = asyncHandler(async (req: Request, res: Response) => {
    const { occasionType } = req.query;

    const query: any = { isActive: true };

    if (occasionType) {
        query.occasionType = occasionType;
    }

    const templates = await Template.find(query)

    return res.status(200).json(
        new ApiResponse(200, templates, 'Templates fetched successfully.')
    )
})

// Get single template
const getTemplateById = asyncHandler(async (req: Request, res: Response) => {

    const template = await Template.findById(req.params.id);

    if (!template) {
        throw new ApiError(404, 'Template not found.')
    }

    return res.status(200).json(
        new ApiResponse(200, template, 'Template fetched successfully.')
    )
})

export {getAllTemplates, getTemplateById};