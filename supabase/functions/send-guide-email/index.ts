
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY");
const MAILGUN_DOMAIN = Deno.env.get("MAILGUN_DOMAIN");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, emailContent } = await req.json();

    if (!email || !emailContent) {
      return new Response(
        JSON.stringify({ error: "Email and content are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending email to ${email}`);
    
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
        <img src="https://lovable-uploaded-healing-from-scratch.netlify.app/healing-from-scratch-logo.png" alt="Healing From Scratch" style="max-height: 120px; margin: 0 auto;" />
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
    formData.append("subject", "Your Personalized Healing Guide");
    formData.append("html", enhancedEmailContent);

    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    
    const response = await fetch(mailgunUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      },
      body: formData,
    });

    const mailgunResponse = await response.json();
    console.log("Mailgun response:", mailgunResponse);

    if (!response.ok) {
      throw new Error(`Mailgun error: ${mailgunResponse.message || "Unknown error"}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
