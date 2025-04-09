
import { supportData } from "../data/symptoms";
import { getProductUrl } from "../utils/product-urls";

type OrganScore = {
  organ: string;
  score: number;
};

/**
 * Fetches all organs with their scores
 */
export const getAllOrgansWithScores = (scores: { [key: string]: number }): OrganScore[] => {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([organ, score]) => ({ organ, score }));
};

/**
 * Fetches high scoring organs (score >= 5)
 */
export const getHighScoringOrgans = (scores: { [key: string]: number }): OrganScore[] => {
  return Object.entries(scores)
    .filter(([_, score]) => score >= 5)
    .sort(([, a], [, b]) => b - a)
    .map(([organ, score]) => ({ organ, score }));
};

/**
 * Generates email content for the personalized guide
 */
export const generateEmailContent = (scores: { [key: string]: number }): string => {
  const allOrgans = getAllOrgansWithScores(scores);
  const highScoringOrgans = getHighScoringOrgans(scores);
  
  let emailContent = `
    <div style="font-family: 'Libre Bodoni', serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2d3748;">
      <h2 style="color: #4a5568; font-family: 'Libre Bodoni', serif;">Your Personalized Support Guide</h2>
  `;
  
  if (highScoringOrgans.length > 0) {
    emailContent += `
      <p>Top scoring organs: ${highScoringOrgans.slice(0, 3).map(({organ}) => organ).join(', ')}</p>
    `;
  } else {
    emailContent += `
      <p>No organ systems scored 5 or higher. Below are recommendations for all systems to support your overall health.</p>
    `;
  }
  
  allOrgans.forEach(({ organ, score }) => {
    const organData = supportData.find(item => item.organ === organ);
    if (!organData) return;
    
    emailContent += `
      <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #f7f9f7; padding: 12px; border-bottom: 1px solid #e2e8f0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
          <h3 style="color: #4a5568; font-family: 'Libre Bodoni', serif; display: flex; align-items: center; gap: 8px; margin: 0;">
            ${organ} Support <span style="font-size: 14px; margin-left: 8px;">(Score: ${score})</span>
          </h3>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e2e8f0; border-top: 0; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div>
              <h4 style="color: #4a5568; font-weight: 500; font-size: 14px; margin-bottom: 8px;">Lifestyle Practices</h4>
              <div style="background-color: #f7f9f7; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0;">
                <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px;">
                  ${organData.lifestyle.map(item => {
                    if (item.includes("Breathwork")) {
                      return `<li><a href="https://www.instagram.com/reel/C8Ihw0bRXcp/" style="color: #68a684;">Breathwork</a>${item.replace("Breathwork", "")}</li>`;
                    } else if (item.includes("Diaphragmatic breathing")) {
                      return `<li><a href="https://www.instagram.com/reel/C8Ihw0bRXcp/" style="color: #68a684;">Diaphragmatic breathing</a>${item.replace("Diaphragmatic breathing", "")}</li>`;
                    }
                    return `<li>${item}</li>`;
                  }).join('')}
                </ul>
              </div>
            </div>
            
            <div>
              <h4 style="color: #4a5568; font-weight: 500; font-size: 14px; margin-bottom: 8px;">Nutrition Support</h4>
              <div style="background-color: #f7f9f7; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0;">
                <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px;">
                  ${organData.nutrition.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            </div>
            
            <div>
              <h4 style="color: #4a5568; font-weight: 500; font-size: 14px; margin-bottom: 8px;">Herbal Allies</h4>
              <div style="background-color: #f7f9f7; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0;">
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${organData.herbs.map(herb => `
                    <span style="display: inline-block; background-color: #edf2f7; padding: 4px 8px; border-radius: 9999px; font-size: 12px; color: #4a5568;">${herb}</span>
                  `).join('')}
                </div>
                ${organ === "Digestion" ? `
                  <p style="margin-top: 12px; font-style: italic; font-weight: 500; color: #4a5568; font-size: 12px;">
                    *Note: These are general herbal recommendations. If you have bloating or SIBO, Fennel, Plantain and Chamomile may not be supportive. See a Functional Dietitian for more support.
                  </p>
                ` : ''}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 12px; text-align: center;">
            <p style="font-size: 14px; color: #4a5568;">
              <a href="${getProductUrl(organ)}" style="color: #68a684; text-decoration: underline;">Shop ${organ} Support Products</a>
            </p>
            <p style="font-size: 13px; color: #718096; margin-top: 8px;">
              Begin with gentle support for this system. Some of the herbs listed in this guide can interact with medication. Always consult with a healthcare provider before starting any new health regimen. For more support, <a href="https://calendly.com/healingfromscratch/customhealthroadmap" style="color: #68a684; text-decoration: underline;">click here</a> to schedule a Custom Health Roadmap Session.
            </p>
          </div>
        </div>
      </div>
    `;
  });
  
  emailContent += `
      <div style="margin-top: 30px; text-align: center;">
        <p style="font-size: 14px; color: #718096;">Begin with gentle support for your highest-scoring systems. Always consult with a healthcare provider before starting any new health regimen. For more support, <a href="https://calendly.com/healingfromscratch/customhealthroadmap" style="color: #68a684; text-decoration: underline;">click here</a> to schedule a Custom Health Roadmap Session.</p>
      </div>
    </div>
  `;
  
  return emailContent;
};

/**
 * Sends an email with the personalized guide
 */
export const sendEmail = async (email: string, scores: { [key: string]: number }): Promise<void> => {
  const emailContent = generateEmailContent(scores);
  
  try {
    const response = await fetch('/.netlify/functions/send-guide-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        emailContent: emailContent
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send email");
    }
    
    const data = await response.json();
    console.log("Email sent successfully:", data);
    
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
