import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = (buffer: Buffer, folderName = 'political_posters'): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: folderName },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    return reject(error);
                }
                if (result) {
                    return resolve(result);
                }
                reject(new Error('Image upload failed'));
            }
        );
        uploadStream.end(buffer);
    });
};

export default cloudinary;