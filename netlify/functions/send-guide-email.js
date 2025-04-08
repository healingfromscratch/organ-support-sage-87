
// Netlify serverless function for sending emails via Mailgun
const fetch = require('node-fetch');
const FormData = require('form-data');

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

  // Check for required environment variables first
  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
  const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
  
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    console.error("Missing required environment variables:", {
      hasMailgunKey: !!MAILGUN_API_KEY,
      hasMailgunDomain: !!MAILGUN_DOMAIN
    });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Server configuration error: Missing required Mailgun environment variables" 
      })
    };
  }

  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
  const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

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
    console.log(`Using Mailgun domain: ${MAILGUN_DOMAIN}`);
    
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

    // Send email via Mailgun
    const formData = new FormData();
    formData.append("from", `Healing From Scratch <no-reply@${MAILGUN_DOMAIN}>`);
    formData.append("to", email);
    formData.append("subject", "Your Personalized Support Guide");
    formData.append("html", enhancedEmailContent);

    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    
    const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64');
    
    console.log(`Sending request to Mailgun at: ${mailgunUrl}`);
    
    const response = await fetch(mailgunUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: formData
    });

    // Better error handling for Mailgun response
    if (!response.ok) {
      const responseText = await response.text();
      console.error("Mailgun error response:", responseText);
      
      try {
        // Try to parse as JSON if possible
        const errorJson = JSON.parse(responseText);
        throw new Error(`Mailgun error: ${errorJson.message || JSON.stringify(errorJson)}`);
      } catch (parseError) {
        // If not JSON, use the raw text
        throw new Error(`Mailgun error: ${responseText}`);
      }
    }
    
    const mailgunResponse = await response.json();
    console.log("Mailgun success response:", mailgunResponse);

    // Add subscriber to Beehiiv if API key and publication ID are provided
    if (BEEHIIV_API_KEY && BEEHIIV_PUBLICATION_ID) {
      try {
        console.log(`Adding ${email} to Beehiiv mailing list`);
        
        const beehiivUrl = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`;
        
        const beehiivResponse = await fetch(beehiivUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${BEEHIIV_API_KEY}`
          },
          body: JSON.stringify({
            email: email,
            utm_source: "healing_from_scratch_quiz",
            reactivate_existing: true,
            send_welcome_email: true
          })
        });
        
        const beehiivData = await beehiivResponse.json();
        console.log("Beehiiv response:", beehiivData);
        
        if (!beehiivResponse.ok) {
          console.error("Beehiiv API error:", beehiivData);
        }
      } catch (beehiivError) {
        // Log the error but don't fail the function, as the email was still sent
        console.error("Error adding subscriber to Beehiiv:", beehiivError);
      }
    } else {
      console.log("Skipping Beehiiv integration - missing API key or publication ID");
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
