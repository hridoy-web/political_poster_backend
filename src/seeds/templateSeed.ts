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
        title: 'Modern Independence Day Poster (3-Photos)',
        occasionType: 'স্বাধীনতা দিবস',
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
        htmlLayout: `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html, body { width: 1200px; height: 1600px; margin: 0; padding: 0; }
        body {
          position: relative; overflow: hidden;
          font-family: 'Hind Siliguri', sans-serif; color: #ffffff;
          background: radial-gradient(circle at top right, #065f46, #022c22, #000000);
        }
        .poster {
          position: relative; z-index: 5; width: 100%; height: 100%;
          padding: 60px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .top-header {
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1); padding: 15px 35px; border-radius: 50px;
        }
        .badge-text { color: #f87171; font-weight: 800; font-size: 24px; letter-spacing: 1px; }
        
        /* Upore 2ti Leader Image */
        .leaders-grid { display: flex; justify-content: center; gap: 40px; margin-top: 10px; }
        .leader-card {
          width: 340px; height: 410px; border-radius: 24px; padding: 6px;
          background: linear-gradient(135deg, #fbbf24, #10b981, #ef4444);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5); position: relative; overflow: hidden;
        }
        .leader-card img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; display: block; }
        .leader-tag {
          position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
          color: #fbbf24; padding: 6px 22px; border-radius: 30px;
          font-size: 18px; font-weight: 700; border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .headline-box {
          background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(15px);
          border: 2px solid rgba(251, 191, 36, 0.4); border-radius: 30px;
          padding: 45px 30px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .headline-box h1 { margin: 0; font-size: 60px; font-weight: 800; line-height: 1.25; color: #fbbf24; }

        /* Nicher White Carder modhe 1ti User Image */
        .footer-card {
          background: #ffffff; color: #022c22; border-radius: 30px; padding: 25px 35px;
          display: flex; align-items: center; gap: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.7);
        }
        .footer-avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 5px solid #ef4444; flex-shrink: 0; }
        .footer-info h2 { margin: 0; font-size: 40px; font-weight: 800; color: #0f172a; }
        .footer-info p { margin: 6px 0 0; font-size: 20px; color: #475569; font-weight: 600; }
        .promoter-tag { background: #ef4444; color: #ffffff; padding: 4px 14px; border-radius: 20px; font-weight: 700; font-size: 14px; text-transform: uppercase; display: inline-block; margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <main class="poster">
        <div class="top-header">
          <span class="badge-text">মহান স্বাধীনতা দিবস</span>
          <span style="font-size: 20px; color: #fbbf24; font-weight: 700;">২৬ মার্চ ২০২৬</span>
        </div>
        <div class="leaders-grid">
          <div class="leader-card">
            <img src="{{LEADER_PHOTO_1}}" alt="Leader 1">
            <div class="leader-tag">জাতীয় নেতা</div>
          </div>
          <div class="leader-card">
            <img src="{{LEADER_PHOTO_2}}" alt="Leader 2">
            <div class="leader-tag">জাতীয় নেতা</div>
          </div>
        </div>
        <div class="headline-box">
          <h1>{{HEADLINE}}</h1>
        </div>
        <div class="footer-card">
          <img class="footer-avatar" src="{{USER_PHOTO}}" alt="User">
          <div class="footer-info">
            <span class="promoter-tag">প্রচারে</span>
            <h2>{{NAME}}</h2>
            <p>{{DESIGNATION}} • {{PARTY}}, {{DISTRICT}}</p>
          </div>
        </div>
      </main>
    </body>
    </html>
  `,
        layoutConfig: { slots: 3, themeColor: 'modern-emerald-gold' },
        isActive: true
      },
      {
        title: 'Modern Victory Day Poster (3-Photos)',
        occasionType: 'বিজয় দিবস',
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
        htmlLayout: `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html, body { width: 1200px; height: 1600px; margin: 0; padding: 0; }
        body {
          position: relative; overflow: hidden;
          font-family: 'Hind Siliguri', sans-serif; color: #ffffff;
          background: linear-gradient(135deg, #881337, #4c0519, #022c22);
        }
        .poster {
          position: relative; z-index: 5; width: 100%; height: 100%;
          padding: 60px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .top-header {
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1); padding: 15px 35px; border-radius: 50px;
        }
        .badge-text { color: #fbbf24; font-weight: 800; font-size: 24px; letter-spacing: 1px; }
        
        .leaders-grid { display: flex; justify-content: center; gap: 40px; margin-top: 10px; }
        .leader-card {
          width: 340px; height: 410px; border-radius: 24px; padding: 6px;
          background: linear-gradient(135deg, #10b981, #ffffff, #fbbf24);
          box-shadow: 0 25px 50px rgba(0,0,0,0.6); position: relative; overflow: hidden;
        }
        .leader-card img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; display: block; }
        .leader-tag {
          position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
          color: #10b981; padding: 6px 22px; border-radius: 30px;
          font-size: 18px; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .headline-box {
          background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(15px);
          border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 30px;
          padding: 45px 30px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .headline-box h1 { margin: 0; font-size: 60px; font-weight: 800; line-height: 1.25; color: #ffffff; }

        .footer-card {
          background: #ffffff; color: #4c0519; border-radius: 30px; padding: 25px 35px;
          display: flex; align-items: center; gap: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.7);
        }
        .footer-avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 5px solid #10b981; flex-shrink: 0; }
        .footer-info h2 { margin: 0; font-size: 40px; font-weight: 800; color: #0f172a; }
        .footer-info p { margin: 6px 0 0; font-size: 20px; color: #475569; font-weight: 600; }
        .promoter-tag { background: #10b981; color: #ffffff; padding: 4px 14px; border-radius: 20px; font-weight: 700; font-size: 14px; text-transform: uppercase; display: inline-block; margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <main class="poster">
        <div class="top-header">
          <span class="badge-text">মহান বিজয় দিবস</span>
          <span style="font-size: 20px; color: #10b981; font-weight: 700;">১৬ ডিসেম্বর</span>
        </div>
        <div class="leaders-grid">
          <div class="leader-card">
            <img src="{{LEADER_PHOTO_1}}" alt="Leader 1">
            <div class="leader-tag">জাতীয় নেতা</div>
          </div>
          <div class="leader-card">
            <img src="{{LEADER_PHOTO_2}}" alt="Leader 2">
            <div class="leader-tag">জাতীয় নেতা</div>
          </div>
        </div>
        <div class="headline-box">
          <h1>{{HEADLINE}}</h1>
        </div>
        <div class="footer-card">
          <img class="footer-avatar" src="{{USER_PHOTO}}" alt="User">
          <div class="footer-info">
            <span class="promoter-tag">শুভেচ্ছান্তে</span>
            <h2>{{NAME}}</h2>
            <p>{{DESIGNATION}} • {{PARTY}}, {{DISTRICT}}</p>
          </div>
        </div>
      </main>
    </body>
    </html>
  `,
        layoutConfig: { slots: 3, themeColor: 'modern-crimson-gold' },
        isActive: true
      },
      {
        title: 'Modern Election Campaign Poster (2-Photos)',
        occasionType: 'নির্বাচনী প্রচার',
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
        htmlLayout: `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html, body { width: 1200px; height: 1600px; margin: 0; padding: 0; }
        body {
          position: relative; overflow: hidden;
          font-family: 'Hind Siliguri', sans-serif;
          background: radial-gradient(circle at top left, #1e3a8a, #0f172a, #020617);
          color: #ffffff;
        }
        .poster {
          position: relative; z-index: 5; width: 100%; height: 100%;
          padding: 60px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .top-header {
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1); padding: 15px 35px; border-radius: 50px;
        }
        .candidate-tag { background: #f59e0b; color: #0f172a; padding: 8px 25px; font-weight: 800; border-radius: 30px; font-size: 18px; }

        .campaign-grid { display: flex; gap: 40px; align-items: center; }
        .text-area { flex: 1; }
        .text-area h1 { font-size: 68px; font-weight: 800; line-height: 1.2; margin: 0; color: #f59e0b; text-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        
        /* 2-Photo Layout: Candidate Main Portrait */
        .candidate-portrait {
          width: 450px; height: 580px; border-radius: 30px; border: 6px solid #f59e0b;
          overflow: hidden; box-shadow: 0 35px 70px rgba(0,0,0,0.7); flex-shrink: 0;
          background: #000;
        }
        .candidate-portrait img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .footer-card {
          background: #ffffff; color: #0f172a; border-radius: 30px; padding: 25px 35px;
          display: flex; align-items: center; gap: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.7);
        }
        .footer-avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 5px solid #f59e0b; flex-shrink: 0; }
        .footer-info h2 { margin: 0; font-size: 40px; font-weight: 800; color: #0f172a; }
        .footer-info p { margin: 6px 0 0; font-size: 20px; color: #475569; font-weight: 600; }
        .promoter-tag { background: #f59e0b; color: #0f172a; padding: 4px 14px; border-radius: 20px; font-weight: 800; font-size: 14px; text-transform: uppercase; display: inline-block; margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <main class="poster">
        <div class="top-header">
          <div class="candidate-tag">নির্বাচনী প্রচার</div>
          <span style="font-size: 20px; color: #f59e0b; font-weight: 700;">উন্নয়ন ও অগ্রগতির প্রতীক</span>
        </div>
        <div class="campaign-grid">
          <div class="text-area">
            <h1>{{HEADLINE}}</h1>
          </div>
          <div class="candidate-portrait">
            <img src="{{USER_PHOTO}}" alt="Candidate">
          </div>
        </div>
        <div class="footer-card">
          <img class="footer-avatar" src="{{USER_PHOTO}}" alt="User">
          <div class="footer-info">
            <span class="promoter-tag">প্রচারে</span>
            <h2>{{NAME}}</h2>
            <p>{{DESIGNATION}} • {{PARTY}}, {{DISTRICT}}</p>
          </div>
        </div>
      </main>
    </body>
    </html>
  `,
        layoutConfig: { slots: 2, themeColor: 'modern-navy-gold' },
        isActive: true
      },
      {
        title: 'Modern Rights & Public Welfare Poster (2-Photos)',
        occasionType: 'অধিকার ও জনকল্যাণ',
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
        htmlLayout: `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html, body { width: 1200px; height: 1600px; margin: 0; padding: 0; }
        body {
          position: relative; overflow: hidden;
          font-family: 'Hind Siliguri', sans-serif;
          background: linear-gradient(135deg, #31103f, #1a0624, #05010a);
          color: #ffffff;
        }
        .poster {
          position: relative; z-index: 5; width: 100%; height: 100%;
          padding: 60px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .top-header { 
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); 
          color: #e879f9; padding: 15px 35px; font-weight: 700; font-size: 22px; 
          border-radius: 30px; border: 1px solid rgba(232, 121, 249, 0.3); 
        }
        
        .welfare-grid { display: flex; gap: 40px; align-items: center; }
        .welfare-text { flex: 1; }
        .welfare-text h1 { font-size: 64px; font-weight: 800; line-height: 1.25; color: #f0abfc; margin: 0; }

        .welfare-portrait {
          width: 440px; height: 560px; border-radius: 25px; border: 6px solid #e879f9;
          overflow: hidden; box-shadow: 0 35px 70px rgba(0,0,0,0.8); flex-shrink: 0;
          background: #000;
        }
        .welfare-portrait img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .footer-card {
          background: #ffffff; color: #1a0624; border-radius: 30px; padding: 25px 35px;
          display: flex; align-items: center; gap: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8); border-top: 6px solid #e879f9;
        }
        .footer-avatar { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 5px solid #e879f9; flex-shrink: 0; }
        .footer-info h2 { margin: 0; font-size: 40px; font-weight: 800; color: #0f172a; }
        .footer-info p { margin: 6px 0 0; font-size: 20px; color: #475569; font-weight: 600; }
        .promoter-tag { background: #e879f9; color: #1a0624; padding: 4px 14px; border-radius: 20px; font-weight: 800; font-size: 14px; text-transform: uppercase; display: inline-block; margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <main class="poster">
        <div class="top-header">
          <span>নাগরিক অধিকার ও জনকল্যাণ আন্দোলন</span>
          <span style="color:#ffffff; font-size:18px;">সচেতনতা ও ন্যায়বিচার</span>
        </div>
        <div class="welfare-grid">
          <div class="welfare-text">
            <h1>{{HEADLINE}}</h1>
          </div>
          <div class="welfare-portrait">
            <img src="{{USER_PHOTO}}" alt="Welfare Leader">
          </div>
        </div>
        <div class="footer-card">
          <img class="footer-avatar" src="{{USER_PHOTO}}" alt="User">
          <div class="footer-info">
            <span class="promoter-tag">আহবানে</span>
            <h2>{{NAME}}</h2>
            <p>{{DESIGNATION}} • {{PARTY}}, {{DISTRICT}}</p>
          </div>
        </div>
      </main>
    </body>
    </html>
  `,
        layoutConfig: { slots: 2, themeColor: 'modern-welfare-purple' },
        isActive: true
      }
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