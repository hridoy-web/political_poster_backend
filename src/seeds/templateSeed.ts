import mongoose from 'mongoose';
import { Template } from '../models/Template.js';

const seedTemplates = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_DB_URI;

    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not defined. Please check your .env file.');
      process.exit(1);
    }

    // Database connection
    await mongoose.connect(mongoUri);
    console.log('Database connected successfully. Starting template seeding...');

    // Clear existing templates
    await Template.deleteMany({});

    const dummyTemplates = [
      {
        title: 'Victory Day Special Poster',
        occasionType: 'বিজয় দিবস',
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
        htmlLayout: `
          <!DOCTYPE html>
          <html lang="bn">
          <head>
            <meta charset="UTF-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Kalpurush&display=swap');
              * { box-sizing: border-box; margin: 0; padding: 0; }
              body {
                width: 1200px;
                height: 1600px;
                font-family: 'Kalpurush', sans-serif;
                background: linear-gradient(180deg, #006a4e 0%, #f42a41 100%);
                color: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 60px;
              }
              .leader-photos { display: flex; justify-content: center; gap: 30px; }
              .leader-img { width: 220px; height: 260px; border-radius: 12px; border: 5px solid #ffffff; object-fit: cover; }
              .headline-container { text-align: center; margin: 30px 0; }
              .headline { font-size: 75px; font-weight: bold; color: #ffeb3b; text-shadow: 3px 3px 6px #000; }
              .user-section { background: rgba(0, 0, 0, 0.65); border-radius: 20px; padding: 40px; text-align: center; border: 2px solid #ffeb3b; }
              .user-img { width: 280px; height: 320px; border-radius: 50%; border: 6px solid #ffeb3b; object-fit: cover; }
              .footer-credits { font-size: 42px; margin-top: 20px; font-weight: bold; color: #ffffff; }
              .footer-sub { font-size: 30px; color: #e0e0e0; margin-top: 5px; }
            </style>
          </head>
          <body>
            <div class="leader-photos">
              <img class="leader-img" src="{{LEADER_PHOTO_1}}" alt="Leader 1" />
              <img class="leader-img" src="{{LEADER_PHOTO_2}}" alt="Leader 2" />
            </div>
            <div class="headline-container">
              <h1 class="headline">{{HEADLINE}}</h1>
            </div>
            <div class="user-section">
              <img class="user-img" src="{{USER_PHOTO}}" alt="User" />
              <div class="footer-credits">প্রচারে: {{NAME}}</div>
              <div class="footer-sub">{{DESIGNATION}}, {{PARTY}}</div>
              <div class="footer-sub">{{DISTRICT}}</div>
            </div>
          </body>
          </html>
        `,
        layoutConfig: { slots: 2, themeColor: 'green-red' },
        isActive: true,
      },
      {
        title: 'National Mourning Day Poster',
        occasionType: 'শোক/স্মরণ',
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
        htmlLayout: `
          <!DOCTYPE html>
          <html lang="bn">
          <head>
            <meta charset="UTF-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Kalpurush&display=swap');
              * { box-sizing: border-box; margin: 0; padding: 0; }
              body {
                width: 1200px;
                height: 1600px;
                font-family: 'Kalpurush', sans-serif;
                background: #121212;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 60px;
                border: 20px solid #333333;
              }
              .headline-container { text-align: center; margin-top: 40px; }
              .headline { font-size: 70px; font-weight: bold; color: #e0e0e0; }
              .user-section { text-align: center; background: #1e1e1e; padding: 40px; border-radius: 15px; }
              .user-img { width: 300px; height: 350px; border-radius: 10px; border: 4px solid #ffffff; object-fit: cover; }
              .footer-credits { font-size: 40px; margin-top: 20px; font-weight: bold; }
              .footer-sub { font-size: 28px; color: #aaaaaa; }
            </style>
          </head>
          <body>
            <div class="headline-container">
              <h1 class="headline">{{HEADLINE}}</h1>
            </div>
            <div class="user-section">
              <img class="user-img" src="{{USER_PHOTO}}" alt="User" />
              <div class="footer-credits">শ্রদ্ধাঞ্জলিতে: {{NAME}}</div>
              <div class="footer-sub">{{DESIGNATION}}, {{PARTY}}</div>
              <div class="footer-sub">{{DISTRICT}}</div>
            </div>
          </body>
          </html>
        `,
        layoutConfig: { slots: 1, themeColor: 'black-white' },
        isActive: true,
      },
    ];

    await Template.insertMany(dummyTemplates);
    console.log('Templates seeded successfully into database!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed templates:', error);
    process.exit(1);
  }
};

seedTemplates();