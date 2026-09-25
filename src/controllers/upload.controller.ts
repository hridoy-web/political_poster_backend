import { Request, Response } from 'express';
import { uploadOnCloudinary } from '../config/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const uploadImages = asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        throw new ApiError(400, 'At least 1 image file is required.')
    }

    if (files.length > 3) {
        throw new ApiError(400, 'You can upload a maximum of 3 images.')
    }

    const uploadPromises = files.map((file) => uploadOnCloudinary(file.buffer))
    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((result) => result.secure_url)

    return res.status(200).json(
        new ApiResponse(200, { urls: imageUrls }, 'Images uploaded successfully.')
    )
})

export { uploadImages };