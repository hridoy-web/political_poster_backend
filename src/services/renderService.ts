// @ts-nocheck
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
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
  slotsCount?: number; 
}

export const renderPosterToImage = async (options: IRenderPosterOptions): Promise<string> => {
  const { htmlLayout, formData, uploadedPhotoUrls, slotsCount = 3 } = options;
  
  let userPhoto = uploadedPhotoUrls[2] || uploadedPhotoUrls[0] || 'https://via.placeholder.com/300';
  let leaderPhoto1 = uploadedPhotoUrls[0] || 'https://via.placeholder.com/250';
  let leaderPhoto2 = uploadedPhotoUrls[1] || uploadedPhotoUrls[0] || 'https://via.placeholder.com/250';

  let compiledHtml = htmlLayout
    .replace(/{{HEADLINE}}/g, formData.headline)
    .replace(/{{NAME}}/g, formData.name)
    .replace(/{{DESIGNATION}}/g, formData.designation)
    .replace(/{{PARTY}}/g, formData.party)
    .replace(/{{DISTRICT}}/g, formData.unionOrThanaOrDistrict)
    .replace(/{{USER_PHOTO}}/g, userPhoto)
    .replace(/{{LEADER_PHOTO_1}}/g, leaderPhoto1)
    .replace(/{{LEADER_PHOTO_2}}/g, leaderPhoto2);

  let browser;

  try {
    chromium.setHeadlessMode = true;
    chromium.setGraphicsMode = false;

    const executablePath = await chromium.executablePath();

    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    if (!browser) {
      throw new Error('Failed to create browser instance on cloud server.');
    }

    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });
    await page.setContent(compiledHtml, { waitUntil: 'networkidle0', timeout: 60000 });

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

    const imageBuffer = (await page.screenshot({ type: 'png', optimizeForSpeed: true })) as Buffer;
    await browser.close();

    const uploadResult = await uploadOnCloudinary(imageBuffer, 'generated_posters');
    return uploadResult.secure_url;

  } catch (error) {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
       
      }
    }
    console.error('Detailed Cloud Render Error:', error);
    throw error;
  }
};