import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Template } from '../models/Template.js';
import { renderPosterToImage } from '../services/renderService.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { Poster } from '../models/Poster.js';

// Poster Generate
const createPoster = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { templateId, formData, uploadedPhotoUrls } = req.body;

  if (!templateId || !formData || !uploadedPhotoUrls || uploadedPhotoUrls.length === 0) {
    throw new ApiError(400, 'Template ID, form data, and at least 1 photo URL are required.');
  }

  const template = await Template.findById(templateId);
  if (!template || !template.isActive) {
    throw new ApiError(404, 'Selected template not found or inactive.');
  }

  // Create record in database
  const poster = await Poster.create({
    userId,
    templateId,
    formData,
    uploadedPhotoUrls,
    status: 'generating',
  });

  try {
    const generatedImageUrl = await renderPosterToImage({
      htmlLayout: template.htmlLayout,
      formData: { ...formData, headline: formData.headline },
      uploadedPhotoUrls,
    });

    poster.generatedImageUrl = generatedImageUrl;
    poster.status = 'completed';
    await poster.save();

    return res.status(201).json(
      new ApiResponse(201, poster, 'Poster generated successfully.')
    )

  } catch (error) {
    console.error('Poster Generation Error:', error);
    poster.status = 'failed';
    await poster.save();
    throw new ApiError(500, 'Failed to generate poster image.');
  }

})

// user history
const getUserPosters = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  // Fetch poster history for authenticated user
  const posters = await Poster.find({ userId }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, posters, 'User poster history fetched successfully.')
  );
});

// Regenerate Poster
const regeneratePoster = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const poster = await Poster.findById(id);

  if (!poster) {
    throw new ApiError(404, 'Poster not found.');
  }

  const template = await Template.findById(poster.templateId);
  if (!template || !template.isActive) {
    throw new ApiError(404, 'Template not found or inactive.');
  }

  poster.status = 'generating';
  await poster.save();

  try {
    const generatedImageUrl = await renderPosterToImage({
      htmlLayout: template.htmlLayout,
      formData: { ...poster.formData, headline: poster.formData.headline },
      uploadedPhotoUrls: poster.uploadedPhotoUrls,
    });

    poster.generatedImageUrl = generatedImageUrl;
    poster.status = 'completed';
    await poster.save();

    return res.status(200).json(
      new ApiResponse(200, poster, 'Poster regenerated successfully.')
    );
  } catch (error) {
    console.error('Poster Regeneration Error:', error);
    poster.status = 'failed';
    await poster.save();
    throw new ApiError(500, 'Failed to regenerate poster image.');
  }
});

// Delete Poster
const deletePoster = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const poster = await Poster.findByIdAndDelete(id);

  if (!poster) {
    throw new ApiError(404, 'Poster not found.');
  }

  return res.status(200).json(
    new ApiResponse(200, null, 'Poster deleted successfully.')
  )
})

export { createPoster, getUserPosters, regeneratePoster, deletePoster }