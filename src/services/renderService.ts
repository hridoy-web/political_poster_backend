// @ts-nocheck
import puppeteer from 'puppeteer';
import { uploadOnCloudinary } from '../config/cloudinary.js';

interface IRenderPosterOptions {
  htmlLayout: string;
  formData: {
    name: string;
    designation: string;
    party: string;
    unionOrThanaOrDistrict: string;
    headline: string;
  };
  uploadedPhotoUrls: string[];
}

export const renderPosterToImage = async (options: IRenderPosterOptions): Promise<string> => {
  const { htmlLayout, formData, uploadedPhotoUrls } = options;

  const totalImages = uploadedPhotoUrls.length;
  
  let userPhoto = uploadedPhotoUrls[0] || 'https://via.placeholder.com/300';
  let leaderPhoto1 = 'https://via.placeholder.com/250';
  let leaderPhoto2 = 'https://via.placeholder.com/250';

  // Smart & Precise Image Mapping based on template requirements
  if (totalImages >= 3) {
    leaderPhoto1 = uploadedPhotoUrls[0];
    leaderPhoto2 = uploadedPhotoUrls[1];
    userPhoto = uploadedPhotoUrls[2];
  } else if (totalImages === 2) {
    leaderPhoto1 = uploadedPhotoUrls[0];
    leaderPhoto2 = uploadedPhotoUrls[0]; 
    userPhoto = uploadedPhotoUrls[1];
  } else if (totalImages === 1) {
    userPhoto = uploadedPhotoUrls[0];
    leaderPhoto1 = uploadedPhotoUrls[0];
    leaderPhoto2 = uploadedPhotoUrls[0];
  }

  // Replace placeholders in HTML layout
  let compiledHtml = htmlLayout
    .replace(/{{HEADLINE}}/g, formData.headline)
    .replace(/{{NAME}}/g, formData.name)
    .replace(/{{DESIGNATION}}/g, formData.designation)
    .replace(/{{PARTY}}/g, formData.party)
    .replace(/{{DISTRICT}}/g, formData.unionOrThanaOrDistrict)
    .replace(/{{USER_PHOTO}}/g, userPhoto)
    .replace(/{{LEADER_PHOTO_1}}/g, leaderPhoto1)
    .replace(/{{LEADER_PHOTO_2}}/g, leaderPhoto2);

  // Launch headless browser instance
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set print dimensions (1200x1600px)
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });

  // Set HTML content and wait until network is idle
  await page.setContent(compiledHtml, { waitUntil: 'networkidle0' });

  // Ensure all <img> tags are fully loaded before taking screenshot
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      images.map((img: any) => {
        if (img.complete) return Promise.resolve(true);
        return new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true);
        });
      })
    );
  });

  // Take screenshot of rendered poster as PNG buffer
  const imageBuffer = (await page.screenshot({ type: 'png' })) as Buffer;

  // Close browser
  await browser.close();

  // Upload image buffer to Cloudinary
  const uploadResult = await uploadOnCloudinary(imageBuffer, 'generated_posters');

  return uploadResult.secure_url;
};