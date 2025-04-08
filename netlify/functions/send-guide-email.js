
// Netlify serverless function for sending emails via Mailgun
const fetch = require('node-fetch');
const FormData = require('form-data');

// These environment variables need to be set in Netlify UI
// Go to Site settings > Build & deploy > Environment variables
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse request body
    const { email, emailContent } = JSON.parse(event.body);

    if (!email || !emailContent) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and content are required' })
      };
    }

    console.log(`Sending email to ${email} for Healing From Scratch`);
    
    // Use the updated URL for the logo
    const logoUrl = "http://organs.healingfromscratch.com/healing-from-scratch-logo.png";
    
    // Add logo, Bodoni font, and footer information to the email content
    const enhancedEmailContent = `
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@400;500;600;700&display=swap">
        <style>
          body {
            font-family: 'Libre Bodoni', serif;
          }
        </style>
      </head>
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${logoUrl}" alt="Healing From Scratch" style="max-height: 120px; margin: 0 auto;" />
      </div>
      ${emailContent}
      <div style="margin-top: 40px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; font-family: 'Libre Bodoni', serif;">
        <p style="font-size: 16px; color: #4a5568; margin-bottom: 5px;">Vanessa Berenstein, MA RD FMN CCH</p>
        <p style="font-size: 14px; color: #718096; margin-bottom: 5px;">Holistic Dietitian</p>
        <p style="font-size: 14px; color: #718096; margin-bottom: 5px;">Clinical Herbalist</p>
        <p style="font-size: 14px; color: #718096;">
          <a href="https://linktr.ee/healingfromscratch" style="color: #68a684; text-decoration: underline;">https://linktr.ee/healingfromscratch</a>
        </p>
      </div>
    `;

    const formData = new FormData();
    formData.append("from", `Healing From Scratch <no-reply@${MAILGUN_DOMAIN}>`);
    formData.append("to", email);
    formData.append("subject", "Your Personalized Support Guide");
    formData.append("html", enhancedEmailContent);

    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    
    const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64');
    
    const response = await fetch(mailgunUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: formData
    });

    const mailgunResponse = await response.json();
    console.log("Mailgun response:", mailgunResponse);

    if (!response.ok) {
      throw new Error(`Mailgun error: ${mailgunResponse.message || "Unknown error"}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
      })
    };
  } catch (error) {
    console.error("Error in Healing From Scratch email function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || "Failed to send email" })
    };
  }
};
