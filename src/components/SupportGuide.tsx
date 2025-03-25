
import { useState } from "react";
import { motion } from "framer-motion";
import { supportData } from "../data/symptoms";
import OrganSelector from "./support-guide/OrganSelector";
import SupportDetails from "./support-guide/SupportDetails";
import PrintView from "./support-guide/PrintView";
import PrintButton from "./support-guide/PrintButton";
import { useToast } from "@/hooks/use-toast";

type SupportGuideProps = {
  scores: { [key: string]: number };
};

const SupportGuide = ({ scores }: SupportGuideProps) => {
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const { toast } = useToast();
  
  const sortedOrgans = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([organ]) => organ);
  
  const getOrgansWithScores = () => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([organ, score]) => ({ organ, score }));
  };
  
  const getSelectedData = () => {
    const organ = selectedOrgan || (sortedOrgans.length > 0 ? sortedOrgans[0] : "Liver");
    return supportData.find(item => item.organ === organ) || supportData[0];
  };

  const selectedData = getSelectedData();
  
  const getHighScoringOrgans = () => {
    return Object.entries(scores)
      .filter(([_, score]) => score >= 5)
      .sort(([, a], [, b]) => b - a)
      .map(([organ, score]) => ({ organ, score }));
  };

  const getProductUrl = (organ: string): string => {
    switch (organ) {
      case "Liver":
        return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=liver";
      case "Digestion":
        return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=digestive";
      case "Kidneys":
        return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=kidney";
      case "Skin/Lymph":
        return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=lymph";
      case "Lungs":
        return "https://healingfromscratch.gethealthy.store/catalogsearch/result/?q=hist";
      default:
        return "https://healingfromscratch.gethealthy.store";
    }
  };

  const generateEmailContent = () => {
    const highScoringOrgans = getHighScoringOrgans();
    
    if (highScoringOrgans.length === 0) {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2d3748;">
          <h2 style="color: #4a5568; font-family: 'Georgia', serif;">Your Personalized Support Guide</h2>
          <p>No organ systems scored 5 or higher. Continue supporting your overall health and monitor your symptoms.</p>
          <p style="margin-top: 30px; font-size: 14px; color: #718096;">Begin with gentle support for your highest-scoring systems. Always consult with a healthcare provider before starting any new health regimen.</p>
        </div>
      `;
    }
    
    let emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2d3748;">
        <h2 style="color: #4a5568; font-family: 'Georgia', serif;">Your Personalized Support Guide</h2>
        <p>Top scoring organs: ${highScoringOrgans.slice(0, 3).map(({organ}) => organ).join(', ')}</p>
    `;
    
    highScoringOrgans.forEach(({ organ, score }) => {
      const organData = supportData.find(item => item.organ === organ);
      if (!organData) return;
      
      emailContent += `
        <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #f7f9f7; padding: 12px; border-bottom: 1px solid #e2e8f0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <h3 style="color: #4a5568; font-family: 'Georgia', serif; display: flex; align-items: center; gap: 8px; margin: 0;">
              ${organ} Support <span style="font-size: 14px; margin-left: 8px;">(Score: ${score})</span>
            </h3>
          </div>
          
          <div style="padding: 16px; border: 1px solid #e2e8f0; border-top: 0; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div>
                <h4 style="color: #4a5568; font-weight: 500; font-size: 14px; margin-bottom: 8px;">Lifestyle Practices</h4>
                <div style="background-color: #f7f9f7; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0;">
                  <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px;">
                    ${organData.lifestyle.map(item => `<li>${item}</li>`).join('')}
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
                </div>
              </div>
            </div>
            
            <div style="margin-top: 12px; text-align: center;">
              <p style="font-size: 14px; color: #4a5568;">
                <a href="${getProductUrl(organ)}" style="color: #68a684; text-decoration: underline;">Shop ${organ} Support Products</a>
              </p>
            </div>
          </div>
        </div>
      `;
    });
    
    emailContent += `
        <div style="margin-top: 30px; text-align: center;">
          <p style="font-size: 14px; color: #718096;">Begin with gentle support for your highest-scoring systems. Always consult with a healthcare provider before starting any new health regimen.</p>
        </div>
      </div>
    `;
    
    return emailContent;
  };
  
  const sendEmail = async (email: string) => {
    // In a production environment, you should always handle this on the backend
    // This is a simplified example for demonstration purposes
    const emailContent = generateEmailContent();
    
    // For security reasons, we'll show a toast explaining what would happen in a real implementation
    toast({
      title: "Development Mode",
      description: "In a production app, this would send an email using Mailgun's API via a secure backend endpoint.",
    });
    
    // Simulate an API call
    return new Promise<void>((resolve) => {
      console.log(`Would send email to: ${email}`);
      console.log(`Email content: ${emailContent.substring(0, 150)}...`);
      setTimeout(resolve, 1500);
    });
  };
  
  return (
    <motion.div 
      className="mt-16 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif text-sage-800 mb-3">Your Support Guide</h2>
        <p className="text-sage-700 max-w-2xl mx-auto">
          Use your top-scoring areas to guide your healing journey. Below are tools to support each organ of elimination using lifestyle practices, nourishing foods, and herbal allies.
        </p>
      </div>
      
      <OrganSelector 
        organsWithScores={getOrgansWithScores()}
        selectedOrgan={selectedOrgan}
        defaultOrgan={sortedOrgans[0]}
        onSelectOrgan={setSelectedOrgan}
      />
      
      <SupportDetails data={selectedData} />
      
      <PrintView 
        highScoringOrgans={getHighScoringOrgans()} 
        supportData={supportData}
      />
      
      <PrintButton onSendEmail={sendEmail} />
    </motion.div>
  );
};

export default SupportGuide;
