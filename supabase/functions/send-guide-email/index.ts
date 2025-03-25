
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY");
const MAILGUN_DOMAIN = Deno.env.get("MAILGUN_DOMAIN");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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

    // Initialize Supabase client with service role key to bypass RLS
    const supabase = createClient(
      SUPABASE_URL || "",
      SUPABASE_SERVICE_ROLE_KEY || ""
    );

    // Store email submission in the database
    const { data: submissionData, error: submissionError } = await supabase
      .from("healing_from_scratch_email_submissions")
      .insert({
        email: email,
        content: emailContent
      });

    if (submissionError) {
      console.error("Error storing email submission:", submissionError);
      // Continue with email sending even if database storage fails
    } else {
      console.log("Email submission stored successfully:", submissionData);
    }

    const formData = new FormData();
    formData.append("from", `Healing From Scratch <no-reply@${MAILGUN_DOMAIN}>`);
    formData.append("to", email);
    formData.append("subject", "Your Personalized Support Guide");
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
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully and submission recorded" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in Healing From Scratch email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
